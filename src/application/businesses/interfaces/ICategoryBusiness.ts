import CategoryView from '../../models/category/CategoryView';
import CategoryCreate from '../../models/category/CategoryCreate';
import ResultList from '../../models/common/ResultList';

interface ICategoryBusiness {
    findCategory(keyword?: string, skip?: number, limit?: number): Promise<ResultList<CategoryView>>;

    getCategory(id: number): Promise<CategoryView | undefined>;

    createCategory(data: CategoryCreate): Promise<CategoryView | undefined>;

    initialCategory(data: {isRequired?: boolean, data: any}[], isRequired?: boolean): Promise<boolean>;
}

export default ICategoryBusiness;
