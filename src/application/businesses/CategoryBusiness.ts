import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import ICategoryBusiness from './interfaces/ICategoryBusiness'; // eslint-disable-line
import Category from '../entities/Category';
import CategoryView from '../models/category/CategoryView';
import CategoryCreate from '../models/category/CategoryCreate';
import ResultList from '../models/common/ResultList';
import { CommonError } from '../models/common/Error';
import DataHelper from '../../helpers/DataHelper';

@Service()
export default class CategoryBusiness implements ICategoryBusiness {
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>;

    async findCategory(keyword?: string, skip?: number, limit?: number): Promise<ResultList<CategoryView>> {
        const resultList = new ResultList<CategoryView>(skip, limit);
        let query = this.categoryRepository.createQueryBuilder('category')
            .where('category.deletedAt IS NULL');

        if (keyword && keyword.trim()) {
            keyword = `%${keyword.trim()}%`;
            query = query.andWhere('category.name ilike :keyword', { keyword });
        }
        let [roles, count] = await query
            .orderBy({
                name: 'ASC'
            })
            .skip(resultList.pagination.skip)
            .take(resultList.pagination.limit)
            .getManyAndCount();

        resultList.results = CategoryView.parseArray(roles);
        resultList.pagination.total = count;
        return resultList;
    }

    async getCategory(id: number): Promise<CategoryView | undefined> {
        DataHelper.validateId(id);

        const category = await this.categoryRepository.createQueryBuilder('category')
            .where('category.deletedAt IS NULL')
            .andWhereInIds([id])
            .getOne();

        return category && new CategoryView(category);
    }


    async createCategory(data: CategoryCreate): Promise<CategoryView | undefined> {
        await DataHelper.validateDataModel(data);

        const result = await this.categoryRepository.insert(data);

        let category;

        if (result.raw && result.raw.length)
            category = await this.getCategory(result.raw[0].id);

        return category;
    }

    async initialCategory(list: {isRequired?: boolean, data: any}[], isRequired?: boolean): Promise<boolean> {
        if (!list || !Array.isArray(list))
            throw new CommonError();

        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            if (item.isRequired || isRequired) {
                const categoryCreate = new CategoryCreate();
                categoryCreate.name = item.data.name;
                categoryCreate.value = item.data.value;

                await this.createCategory(categoryCreate);
            }
        }
        console.log('return true');
        return true;
    }
};
