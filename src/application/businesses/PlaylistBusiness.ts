import { Container, Service, Inject } from 'typedi';
import { Repository } from 'typeorm';
import { Validator } from 'class-validator';
import { InjectRepository } from 'typeorm-typedi-extensions';
import IPlaylistBusiness from './interfaces/IPlaylistBusiness'; // eslint-disable-line
import IScreenBusiness from './interfaces/IScreenBusiness';
import ScreenBusiness from './ScreenBusiness';
import Playlist from '../entities/Playlist';
import PlaylistView from '../models/playlist/PlaylistView';
import PlaylistCreate from '../models/playlist/PlaylistCreate';
import PlaylistUpdate from '../models/playlist/PlaylistUpdate';
import { CommonError } from '../models/common/Error';
import ResultList from '../models/common/ResultList';
import DataHelper from '../../helpers/DataHelper';
const validator = Container.get(Validator); // eslint-disable-line

@Service()
export default class PlaylistBusiness implements IPlaylistBusiness {
    @InjectRepository(Playlist)
    private PlaylistRepository: Repository<Playlist>;

    @Inject(() => ScreenBusiness)
    private screenBusiness: IScreenBusiness;

    async findPlaylists(userId: number, keyword?: string, skip?: number, limit?: number): Promise<ResultList<PlaylistView>> {
        const resultList = new ResultList<PlaylistView>(skip, limit);

        let query = this.PlaylistRepository.createQueryBuilder('playlist')
            // .leftJoinAndSelect('playlist.user', 'user', 'user.deletedAt IS NULL')
            .where('playlist.deletedAt IS NULL')
            .andWhere('playlist.userId = :userId', { userId });

        if (keyword && keyword.trim())
            query = query.andWhere('playlist.name ilike :keyword', { keyword: `%${keyword.trim()}%` });

        let [playlist, count] = await query
            .orderBy({
                id: 'DESC'
            })
            .skip(resultList.pagination.skip)
            .take(resultList.pagination.limit)
            .getManyAndCount();

        if (playlist) {
            for (let i = 0; i < playlist.length; i++) {
                if (playlist[i].screens) {
                    for (let j = 0; j < playlist[i].screens.length; j++) {
                        let screen = await this.screenBusiness.getScreen(playlist[i].screens[j].id);
                        playlist[i].screens[j].data = screen;
                    }
                }
            }
        }

        resultList.results = PlaylistView.parseArray(playlist);
        resultList.pagination.total = count;

        return resultList;
    }

    async getPlaylist(id: number): Promise<PlaylistView | undefined> {
        DataHelper.validateId(id);

        const playlist = await this.PlaylistRepository.createQueryBuilder('playlist')
            .whereInIds([id])
            .andWhere('playlist.deletedAt IS NULL')
            .getOne();

        return playlist && new PlaylistView(playlist);
    }

    async getPlaylistBySlug(slug: string): Promise<PlaylistView | undefined> {
        if (!slug)
            return;

        let query = this.PlaylistRepository.createQueryBuilder('playlist')
            .where('lower(playlist.slug) = :slug', { slug: slug.trim().toLowerCase() })
            .andWhere('playlist.deletedAt IS NULL');

        const playlist = await query.getOne();
        if (playlist && playlist.screens) {
            for (let j = 0; j < playlist.screens.length; j++) {
                let screen = await this.screenBusiness.getScreen(playlist.screens[j].id);
                playlist.screens[j].data = screen;
            }
        }
        return playlist && new PlaylistView(playlist);
    }

    private async getPlaylistByName(name: string, excludeId?: number): Promise<PlaylistView | undefined> {
        if (!name)
            throw new CommonError(101, 'name');

        let query = this.PlaylistRepository.createQueryBuilder('playlist')
            .where('lower(playlist.name) = :name', { name: name.trim().toLowerCase() })
            .andWhere('playlist.deletedAt IS NULL');

        if (excludeId)
            query = query.andWhere('playlist.id != :id', { id: excludeId });

        const playlist = await query.getOne();
        return playlist && new PlaylistView(playlist);
    }

    async createPlaylist(data: PlaylistCreate): Promise<PlaylistView | undefined> {
        await DataHelper.validateDataModel(data);

        const playlistExists = await this.getPlaylistByName(data.name);
        if (playlistExists)
            throw new CommonError(105, 'name');

        let slug = `/${DataHelper.slugify(data.name)}`;
        data.slug = slug;

        const result = await this.PlaylistRepository.insert(data);

        let playlist;
        if (result.raw && result.raw.length)
            playlist = await this.getPlaylist(result.raw[0].id);
        return playlist;
    }

    async updatePlaylist(id: number, data: PlaylistUpdate): Promise<boolean> {
        // await DataHelper.validateModel(id, data);

        const playlist = await this.PlaylistRepository.createQueryBuilder('playlist')
            .whereInIds([id])
            .andWhere('playlist.deletedAt IS NULL')
            .getOne();

        if (!playlist)
            throw new CommonError(104, 'playlist');

        if (!data.name) data.name = playlist.name;

        const playlistExists = await this.getPlaylistByName(data.name, id);
        if (playlistExists)
            throw new CommonError(105, 'name');

        let slug = `/${DataHelper.slugify(data.name)}`;
        data.slug = slug;

        await this.PlaylistRepository.update(id, data);
        return true;
    }

    async deletePlaylist(id: number): Promise<boolean> {
        DataHelper.validateId(id);

        const playlist = await this.PlaylistRepository.createQueryBuilder('playlist')
            .whereInIds([id])
            .andWhere('playlist.deletedAt IS NULL')
            .getOne();

        if (!playlist)
            throw new CommonError(104, 'playlist');

        await this.PlaylistRepository.update(id, { deletedAt: new Date() });
        return true;
    }
};
