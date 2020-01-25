import { Container, Service, Inject } from 'typedi';
import { Repository } from 'typeorm';
import { Validator } from 'class-validator';
import { InjectRepository } from 'typeorm-typedi-extensions';
import IMediaBusiness from './interfaces/IMediaBusiness'; // eslint-disable-line
import IUserBusiness from './interfaces/IUserBusiness';
import UserBusiness from './UserBusiness';
import Media from '../entities/Media';
import MediaView from '../models/media/MediaView';
import MediaCreate from '../models/media/MediaCreate';
import MediaUpdate from '../models/media/MediaUpdate';
import { CommonError } from '../models/common/Error';
import { MediaType } from '../models/common/Enum';
import ResultList from '../models/common/ResultList';
import DataHelper from '../../helpers/DataHelper';
import DateHelper from '../../helpers/DateHelper';
import MinioHelper from '../../helpers/MinioHelper';
import DataAccess from '../dataAccess';
const fileType = require('file-type');
const validator = Container.get(Validator);

@Service()
export default class MediaBusiness implements IMediaBusiness {
    @InjectRepository(Media)
    private MediaRepository: Repository<Media>;

    @Inject(() => UserBusiness)
    private userBusiness: IUserBusiness;

    async findMedias(userId: number, type?: number, keyword?: string, skip?: number, limit?: number): Promise<ResultList<MediaView>> {
        const resultList = new ResultList<MediaView>(skip, limit);

        if (type && type !== MediaType.Image && type !== MediaType.Video && type !== MediaType.Music)
            throw new CommonError(101, 'type');

        let query = this.MediaRepository.createQueryBuilder('media')
            .leftJoinAndSelect('media.user', 'user', 'user.deletedAt IS NULL')
            .leftJoinAndSelect('media.thumbnail', 'thumbnail', 'thumbnail.deletedAt IS NULL')
            .where('media.deletedAt IS NULL')
            .andWhere('media.userId = :userId', { userId });

        if (keyword && keyword.trim())
            query = query.andWhere('media.name ilike :keyword', { keyword: `%${keyword.trim()}%` });

        if (type)
            query = query.andWhere('media.type = :type', { type });

        let [medias, count] = await query
            .orderBy({
                'media.name': 'ASC'
            })
            .skip(resultList.pagination.skip)
            .take(resultList.pagination.limit)
            .getManyAndCount();

        resultList.results = MediaView.parseArray(medias);
        resultList.pagination.total = count;
        return resultList;
    }

    async getMedia(id: number): Promise<MediaView | undefined> {
        DataHelper.validateId(id);

        const media = await this.MediaRepository.createQueryBuilder('media')
            .leftJoinAndSelect('media.user', 'user', 'user.deletedAt IS NULL')
            .whereInIds([id])
            .andWhere('media.deletedAt IS NULL')
            .getOne();

        if (!media)
            throw new CommonError(102, 'media');

        return media && new MediaView(media);
    }

    async getMediaByCode(code: number): Promise<MediaView | undefined> {
        if (!code)
            throw new CommonError(101, 'code');
        if (!validator.isInt(code))
            throw new CommonError(102, 'code');

        const media = await this.MediaRepository.createQueryBuilder('media')
            .where('media.code = :code', { code })
            .andWhere('media.deletedAt IS NULL')
            .getOne();

        return media && new MediaView(media);
    }

    private async getMediaByName(name: string, excludeId?: number): Promise<MediaView | undefined> {
        if (!name)
            throw new CommonError(101, 'name');

        let query = await this.MediaRepository.createQueryBuilder('media')
            .where('lower(media.name) = :name', { name: name.trim().toLowerCase() })
            .andWhere('media.deletedAt IS NULL');

        if (excludeId)
            query = query.andWhere('media.id != :id', { id: excludeId });

        const media = await query.getOne();
        console.log('mediamedia', media);
        // console.log('new MediaView(media)', media && new MediaView(media));

        return media;
    }

    async createMedia(data: MediaCreate): Promise<MediaView | undefined> {
        await DataHelper.validateDataModel(data);

        const result = await this.MediaRepository.insert(data);

        let media;
        if (result.raw && result.raw.length)
            media = await this.getMedia(result.raw[0].id);
        return media;
    }

    async uploadMedia(id: number, data: any): Promise<string> {
        DataHelper.validateId(id);
        if (!data)
            throw new CommonError();

        const mediaExists = await this.getMediaByName(data.originalname);

        if (mediaExists)
            throw new CommonError(105, 'name');

        let video;
        let image;
        let music;
        let url;
        let typeMedia;

        const type = fileType(data.buffer);
        console.log('type Media', type);
        console.log('process.env.UPLOAD_FORMATS', process.env.UPLOAD_FORMATS);

        if (!type || !(process.env.UPLOAD_FORMATS || '').toLowerCase().split('|').includes(type.ext))
            throw new CommonError(205, 'image and video', 'JPEG (.jpeg/.jpg), GIF (.gif), PNG (.png), MP4, MP3');

        if ((process.env.UPLOAD_IMAGE_FORMATS || '').toLowerCase().split('|').includes(type.ext)) {
            if (data.buffer.length > Number(process.env.UPLOAD_IMAGE_SIZE_LIMIT))
                throw new CommonError(304, 'image', Number(process.env.UPLOAD_IMAGE_SIZE_LIMIT) / 1024, 'KB');
        }

        const user = await this.userBusiness.getUser(id);
        if (!user)
            throw new CommonError(104, 'user');

        if (!process.env.MINIO_BUCKET)
            throw new CommonError(101, 'MINIO BUCKET');
        let minioBucket = process.env.MINIO_BUCKET;

        let nameImage = id + '-' + data.originalname;
        if ((process.env.UPLOAD_IMAGE_FORMATS || '').toLowerCase().split('|').includes(type.ext)) {
            image = {
                url: `media/${id}/file/${nameImage}`,
                size: data.size,
                extension: minioBucket + '/'
            };
            url = `media/${id}/file/${nameImage}`;
            typeMedia = MediaType.Image;
        }
        else if (type.ext === 'mp4') {
            video = {
                url: `media/${id}/video/${nameImage}`,
                size: data.size,
                extension: minioBucket + '/'
            };
            url = `media/${id}/video/${nameImage}`;
            typeMedia = MediaType.Video;
        }                                               // eslint-disable-line
        else if (type.ext === 'mp3') {
            music = {
                url: `media/${id}/music/${nameImage}`,
                size: data.size,
                extension: minioBucket + '/'
            };
            url = `media/${id}/music/${nameImage}`;
            typeMedia = MediaType.Music;
        }                                               // eslint-disable-line               
        else
            throw new CommonError(205, 'image and video');

        let dataCreate = {
            userId: id,
            name: data.originalname,
            type: typeMedia,
            videoInfo: video || null,
            imageInfo: image || null,
            musicInfo: music || null
        };

        let bucketExists = await MinioHelper.getInstance().bucketExists(minioBucket);

        if (!bucketExists)
            await MinioHelper.getInstance().makeBucket(minioBucket, 'us-east-1');

        await MinioHelper.getInstance().putObject(minioBucket, url, data.buffer).then((etag) => {
            console.log(etag);
        }).catch((err) => {
            console.log('errrrr', err);
            throw new CommonError(1, err);
        });

        await DataAccess.executeTransaction(async (queryRunner) => {
            let result = await queryRunner.manager.getRepository(Media).insert(dataCreate);
            if (!result)
                await MinioHelper.getInstance().removeObject(minioBucket, url);
        });

        return process.env.MINIO_BUCKET + '/' + url;

        // const avatar = `/images/${id}/avatar.${type.ext}`;

        // await DataAccess.executeTransaction(async (queryRunner) => {
        //     await queryRunner.manager.getRepository(User).update(id, { avatar });

        //     const filePath = path.join(__dirname, `../../../uploads${avatar}`);
        //     await FileHelper.writeFile(filePath, buffer);
        // });
        // return avatar;
    }

    async updateMedia(id: number, data: MediaUpdate): Promise<boolean> {
        await DataHelper.validateModel(id, data);

        const media = await this.MediaRepository.createQueryBuilder('media')
            .whereInIds([id])
            .andWhere('media.deletedAt IS NULL')
            .getOne();

        if (!media)
            throw new CommonError(104, 'media');

        const mediaExists = await this.getMediaByName(data.name, id);
        if (mediaExists)
            throw new CommonError(105, 'name');

        await this.MediaRepository.update(id, data);
        return true;
    }

    async updateThumbnail(userId: number, id: number, data: any): Promise<any> {
        DataHelper.validateId(id);
        DataHelper.validateId(userId);
        if (!data)
            throw new CommonError();

        const type = fileType(data.buffer);
        if (!type || !(process.env.UPLOAD_IMAGE_FORMATS || '').toLowerCase().split('|').includes(type.ext))
            throw new CommonError(205, 'image and video', 'JPEG (.jpeg/.jpg), GIF (.gif), PNG (.png)');

        if (data.buffer.length > Number(process.env.UPLOAD_IMAGE_SIZE_LIMIT))
            throw new CommonError(304, 'image', Number(process.env.UPLOAD_IMAGE_SIZE_LIMIT) / 1024, 'KB');

        const user = await this.userBusiness.getUser(userId);
        if (!user)
            throw new CommonError(104, 'user');

        const media = await this.getMedia(id);
        if (!media)
            throw new CommonError(104, 'media');

        if (!process.env.MINIO_BUCKET)
            throw new CommonError(101, 'MINIO BUCKET');
        let minioBucket = process.env.MINIO_BUCKET;

        let nameImage = userId + '-' + DateHelper.convertDateReport(new Date()) + '-' + data.originalname;
        let url = `media/${userId}/thumbnail/${nameImage}`;
        let image = {
            url: url,
            size: data.size,
            extension: minioBucket + '/'
        };

        let dataCreate = {
            userId: userId,
            name: data.originalname,
            type: MediaType.Image,
            imageInfo: image
        };

        let bucketExists = await MinioHelper.getInstance().bucketExists(minioBucket);
        if (!bucketExists)
            await MinioHelper.getInstance().makeBucket(minioBucket, 'us-east-1');

        await MinioHelper.getInstance().putObject(minioBucket, url, data.buffer).then((etag) => {
            console.log(etag);
        }).catch((err) => {
            throw new CommonError(1, err);
        });

        await DataAccess.executeTransaction(async (queryRunner) => {
            let result = await queryRunner.manager.getRepository(Media).insert(dataCreate);
            await queryRunner.manager.getRepository(Media).update(id, { thumbnailId: result.raw[0].id });
            if (!result.raw[0].id) {
                await MinioHelper.getInstance().removeObject(minioBucket, url);
                throw new CommonError(1, 'created and update media false');
            }
        });

        return true;
    }

    async deleteMedia(id: number): Promise<boolean> {
        DataHelper.validateId(id);

        const media = await this.MediaRepository.createQueryBuilder('media')
            .whereInIds([id])
            .andWhere('media.deletedAt IS NULL')
            .getOne();

        if (!media)
            throw new CommonError(104, 'media');

        await this.MediaRepository.update(id, { deletedAt: new Date() });
        return true;
    }

    async initialMedias(list: {isRequired?: boolean, data: any}[], isRequired?: boolean): Promise<boolean> {
        if (!list || !Array.isArray(list))
            throw new CommonError();

        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            if (item.isRequired || isRequired) {
                const media = await this.getMediaByCode(item.data.code);
                if (!media) {
                    const mediaCreate = new MediaCreate();
                    mediaCreate.name = item.data.name;

                    await this.createMedia(mediaCreate);
                }
            }
        }
        return true;
    }
};
