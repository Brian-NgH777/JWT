import { Container, Service, Inject } from 'typedi';
import { Repository } from 'typeorm';
import { Validator } from 'class-validator';
import { InjectRepository } from 'typeorm-typedi-extensions';
import IScreenBusiness from './interfaces/IScreenBusiness'; // eslint-disable-line
import Screen from '../entities/Screen';
import ScreenView from '../models/screen/ScreenView';
import ScreenCreate from '../models/screen/ScreenCreate';
import ScreenUpdate from '../models/screen/ScreenUpdate';
import CategoryBusiness from './CategoryBusiness';
import ICategoryBusiness from './interfaces/ICategoryBusiness';
import { CommonError } from '../models/common/Error';
import ResultList from '../models/common/ResultList';
import DataHelper from '../../helpers/DataHelper';
const validator = Container.get(Validator); // eslint-disable-line

@Service()
export default class ScreenBusiness implements IScreenBusiness {
    @InjectRepository(Screen)
    private ScreenRepository: Repository<Screen>;

    @Inject(() => CategoryBusiness)
    private categoryBusiness: ICategoryBusiness;

    async findScreen(userId: number, keyword?: string, skip?: number, limit?: number): Promise<ResultList<ScreenView>> {
        const resultList = new ResultList<ScreenView>(skip, limit);

        let query = this.ScreenRepository.createQueryBuilder('screen')
            // .leftJoinAndSelect('screen.user', 'user', 'user.deletedAt IS NULL')
            .leftJoinAndSelect('screen.ratio', 'ratio', 'screen.deletedAt IS NULL')
            .where('screen.deletedAt IS NULL')
            .andWhere('screen.userId = :userId', { userId });

        if (keyword && keyword.trim())
            query = query.andWhere('screen.name ilike :keyword', { keyword: `%${keyword.trim()}%` });

        let [screen, count] = await query
            .orderBy({
                'screen.id': 'DESC'
            })
            .skip(resultList.pagination.skip)
            .take(resultList.pagination.limit)
            .getManyAndCount();

        resultList.results = ScreenView.parseArray(screen);
        resultList.pagination.total = count;

        return resultList;
    }

    async getScreen(id: number): Promise<ScreenView | undefined> {
        DataHelper.validateId(id);

        const screen = await this.ScreenRepository.createQueryBuilder('screen')
            .leftJoinAndSelect('screen.ratio', 'ratio', 'ratio.deletedAt IS NULL')
            .leftJoinAndSelect('screen.category', 'category', 'category.deletedAt IS NULL')
            .whereInIds([id])
            .andWhere('screen.deletedAt IS NULL')
            .getOne();

        console.log('screenscreen', screen);

        return screen && new ScreenView(screen);
    }

    private async getScreenByName(name: string, excludeId?: number): Promise<ScreenView | undefined> {
        if (!name)
            throw new CommonError(101, 'name');

        let query = this.ScreenRepository.createQueryBuilder('screen')
            .where('lower(screen.name) = :name', { name: name.trim().toLowerCase() })
            .andWhere('screen.deletedAt IS NULL');

        if (excludeId)
            query = query.andWhere('screen.id != :id', { id: excludeId });

        const screen = await query.getOne();
        return screen && new ScreenView(screen);
    }

    async getScreenBySlug(slug: string): Promise<ScreenView | undefined> {
        if (!slug)
            return;

        const screen = await this.ScreenRepository.createQueryBuilder('screen')
            .leftJoinAndSelect('screen.ratio', 'ratio', 'ratio.deletedAt IS NULL')
            .leftJoinAndSelect('screen.category', 'category', 'category.deletedAt IS NULL')
            .where('lower(screen.slug) = :slug', { slug: slug.trim().toLowerCase() })
            .andWhere('screen.deletedAt IS NULL')
            .getOne();

        console.log('screenscreen', screen);

        return screen && new ScreenView(screen);
    }

    async createScreen(data: ScreenCreate): Promise<ScreenView | undefined> {
        await DataHelper.validateDataModel(data);

        const screenExists = await this.getScreenByName(data.name);
        if (screenExists)
            throw new CommonError(105, 'name');

        let category: any;
        if (data.categoryId)
            category = await this.categoryBusiness.getCategory(data.categoryId);

        let slug = `/${category && category.value ? category.value : 'all'}/${DataHelper.slugify(data.name)}`;
        data.slug = slug;

        const result = await this.ScreenRepository.insert(data);

        let screen;
        if (result.raw && result.raw.length)
            screen = await this.getScreen(result.raw[0].id);
        return screen;
    }

    async updateScreen(id: number, data: ScreenUpdate): Promise<boolean> {
        // await DataHelper.validateModel(id, data);

        const screen = await this.ScreenRepository.createQueryBuilder('screen')
            .whereInIds([id])
            .andWhere('screen.deletedAt IS NULL')
            .getOne();

        if (!screen)
            throw new CommonError(104, 'screen');

        if (!data.name) data.name = screen.name;

        const screenExists = await this.getScreenByName(data.name, id);
        if (screenExists)
            throw new CommonError(105, 'name');

        await this.ScreenRepository.update(id, data);
        return true;
    }

    async deleteScreen(id: number): Promise<boolean> {
        DataHelper.validateId(id);

        const screen = await this.ScreenRepository.createQueryBuilder('screen')
            .whereInIds([id])
            .andWhere('screen.deletedAt IS NULL')
            .getOne();

        if (!screen)
            throw new CommonError(104, 'screen');

        await this.ScreenRepository.update(id, { deletedAt: new Date() });
        return true;
    }

    async initialScreen(list: {isRequired?: boolean, data: any}[], isRequired?: boolean): Promise<boolean> {
        if (!list || !Array.isArray(list))
            throw new CommonError();

        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            if (item.isRequired || isRequired) {
                const screenCreate = new ScreenCreate();
                screenCreate.name = item.data.name;

                await this.createScreen(screenCreate);
            }
        }
        return true;
    }
};
