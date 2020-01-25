import { Service, Inject } from 'typedi';
import { JsonController, Authorized, Param, QueryParam, Body, Get, Post, Put, Delete, CurrentUser } from 'routing-controllers';
import IScreenBusiness from '../application/businesses/interfaces/IScreenBusiness';
import ScreenBusiness from '../application/businesses/ScreenBusiness';
import ScreenClaim from '../resources/permissions/ScreenClaim';
import ScreenCreate from '../application/models/screen/ScreenCreate';
import ScreenUpdate from '../application/models/screen/ScreenUpdate';
import UserView from '../application/models/user/UserView';

@Service()
@JsonController('/screen')
export default class ScreenController {
    @Inject(() => ScreenBusiness)
    private screenBusiness: IScreenBusiness;

    @Get('/')
    @Authorized(ScreenClaim.GET)
    findScreens(@CurrentUser() currentUser: UserView, @QueryParam('keyword') keyword: string, @QueryParam('skip') skip: number, @QueryParam('limit') limit: number) {
        return this.screenBusiness.findScreen(currentUser.id, keyword, skip, limit);
    }

    @Get('/:id([0-9]+)')
    @Authorized(ScreenClaim.GET)
    getScreen(@Param('id') id: number) {
        return this.screenBusiness.getScreen(id);
    }

    @Get('/banner')
    // @Authorized(ScreenClaim.GET)
    getScreenBySlug(@QueryParam('slug') slug: string) {
        return this.screenBusiness.getScreenBySlug(slug);
    }

    @Post('/')
    @Authorized(ScreenClaim.CREATE)
    createScreen(@Body() data: ScreenCreate) {
        return this.screenBusiness.createScreen(data);
    }

    @Put('/:id([0-9]+)')
    @Authorized(ScreenClaim.UPDATE)
    updateScreen(@Param('id') id: number, @Body() data: ScreenUpdate) {
        return this.screenBusiness.updateScreen(id, data);
    }

    @Delete('/:id([0-9]+)')
    @Authorized(ScreenClaim.DELETE)
    deleteScreen(@Param('id') id: number) {
        return this.screenBusiness.deleteScreen(id);
    }
};
