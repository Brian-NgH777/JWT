import { Inject } from 'typedi';
import { JsonController, Body, Post } from 'routing-controllers';
import IUserBusiness from '../application/businesses/interfaces/IUserBusiness';
import UserBusiness from '../application/businesses/UserBusiness';
import PermissionBusiness from '../application/businesses/PermissionBusiness';
import IPermissionBusiness from '../application/businesses/interfaces/IPermissionBusiness';
import IRoleBusiness from '../application/businesses/interfaces/IRoleBusiness';
import ICategoryBusiness from '../application/businesses/interfaces/ICategoryBusiness';
import IRatioBusiness from '../application/businesses/interfaces/IRatioBusiness';
import getRoles from '../resources/data/initialization/Role';
import getPermissions from '../resources/data/initialization/Permission';
import getUsers from '../resources/data/initialization/User';
import getCategory from '../resources/data/initialization/Category';
import getRatio from '../resources/data/initialization/Ratio';
import CategoryBusiness from '../application/businesses/CategoryBusiness';
import RatioBusiness from '../application/businesses/RatioBusiness';

@JsonController('/systems')
export default class SystemController {
    @Inject(() => UserBusiness)
    private userBusiness: IUserBusiness;

    @Inject(() => PermissionBusiness)
    private roleBusiness: IRoleBusiness;

    @Inject(() => PermissionBusiness)
    private permissionBusiness: IPermissionBusiness;

    @Inject(() => CategoryBusiness)
    private categoryBusiness: ICategoryBusiness;

    @Inject(() => RatioBusiness)
    private ratioBusiness: IRatioBusiness;

    @Post('/init-data')
    // @Authorized(SystemClaim.INIT_DATA)
    async initData(@Body() isRequired: boolean) {
        console.log('initData');

        const initRoles = getRoles();
        await this.roleBusiness.initialRoles(initRoles, isRequired);

        const initUsers = getUsers();
        await this.userBusiness.initialUsers(initUsers, isRequired);

        const initPermissions = getPermissions();
        await this.permissionBusiness.initialPermissions(initPermissions, isRequired);

        const initCategory = getCategory();
        await this.categoryBusiness.initialCategory(initCategory, isRequired);

        console.log('getRatio');
        const initRatio = getRatio();
        await this.ratioBusiness.initialRatio(initRatio, isRequired);

        return true;
    }
};
