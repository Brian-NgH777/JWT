import { Service, Inject } from 'typedi';
import { JsonController, Authorized, Param, QueryParam, Get } from 'routing-controllers';
import ICategoryBusiness from '../application/businesses/interfaces/ICategoryBusiness';
import CategoryBusiness from '../application/businesses/CategoryBusiness';
import CategoryClaim from '../resources/permissions/CategoryClaim';

@Service()
@JsonController('/category')
export default class CategoryController {
    @Inject(() => CategoryBusiness)
    private categoryBusiness: ICategoryBusiness;

    @Get('/')
    @Authorized(CategoryClaim.GET)
    findCategory(@QueryParam('keyword') keyword: string, @QueryParam('skip') skip: number, @QueryParam('limit') limit: number) {
        return this.categoryBusiness.findCategory(keyword, skip, limit);
    }

    @Get('/:id([0-9]+)')
    @Authorized(CategoryClaim.GET)
    getCategory(@Param('id') id: number) {
        return this.categoryBusiness.getCategory(id);
    }
};
