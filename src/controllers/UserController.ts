import * as path from 'path';
import * as multer from 'multer';
import { Inject } from 'typedi';
import { JsonController, Authorized, CurrentUser, Param, QueryParam, Body, Get, Post, Put, Patch, Delete, UploadedFile, ContentType, Res } from 'routing-controllers';
import IUserBusiness from '../application/businesses/interfaces/IUserBusiness';
import UserBusiness from '../application/businesses/UserBusiness';
import UserView from '../application/models/user/UserView';
import UserClaim from '../resources/permissions/UserClaim';
import UserUpdate from '../application/models/user/UserUpdate';
import UserSignup from '../application/models/user/UserSignup';
import UserSignin from '../application/models/user/UserSignin';
import PasswordUpdate from '../application/models/user/PasswordUpdate';
import PasswordReset from '../application/models/user/PasswordReset';
import FileHelper from '../helpers/FileHelper';

@JsonController('/users')
export default class UserController {
    @Inject(() => UserBusiness)
    private userBusiness: IUserBusiness;

    @Get('/')
    @Authorized(UserClaim.GET)
    findUsers(@QueryParam('keyword') keyword: string, @QueryParam('skip') skip: number, @QueryParam('limit') limit: number) {
        return this.userBusiness.findUsers(keyword, skip, limit);
    }

    @Get('/:id([0-9]+)')
    // @Authorized(UserClaim.GET)
    getUser(@Param('id') id: number) {
        return this.userBusiness.getUser(id);
    }

    @Get('/profile')
    @Authorized()
    getUserProfile(@CurrentUser() currentUser: UserView) {
        return this.userBusiness.getUserProfile(currentUser.id);
    }

    @Get('/export-pdf')
    @ContentType('application/octet-stream')
    exportPDF(@Res() res) {
        const filePath = path.join(__dirname, '../resources/documents/sample.pdf');
        res.set('Content-disposition', 'attachment; filename=sample.pdf');
        return FileHelper.readFile(filePath);
    }

    @Get('/forgot-password')
    forgotPassword(@QueryParam('email') email: string) {
        return this.userBusiness.forgotPassword(email);
    }

    @Post('/signin')
    signin(@Body() data: UserSignin) {
        return this.userBusiness.signin(data);
    }

    @Post('/signup')
    signup(@Body() data: UserSignup) {
        return this.userBusiness.signup(data);
    }

    @Put('/:id([0-9]+)')
    @Authorized(UserClaim.UPDATE)
    updateUser(@Param('id') id: number, @Body() data: UserUpdate) {
        return this.userBusiness.updateUser(id, data);
    }

    @Post('/profile')
    @Authorized()
    updateProfile(@CurrentUser() currentUser: UserView, @Body() data: UserUpdate) {
        return this.userBusiness.updateUser(currentUser.id, data);
    }

    @Patch('/reset-password/:id')
    resetPassword(@Param('id') id: number, @Body() data: PasswordReset) {
        return this.userBusiness.resetPassword(id, data);
    }

    @Patch('/password')
    @Authorized()
    updatePassword(@CurrentUser() currentUser: UserView, @Body() data: PasswordUpdate) {
        return this.userBusiness.updatePassword(currentUser.id, data);
    }

    @Post('/avatar')
    @Authorized()
    uploadUserAvatar(@CurrentUser({ required: true }) currentUser: UserView, @UploadedFile('avatar', { options: { storage: multer.memoryStorage() } }) file: any) {
        return this.userBusiness.uploadUserAvatar(currentUser.id, file.buffer);
    }
    @Delete('/:id([0-9]+)')
    @Authorized(UserClaim.DELETE)
    deleteUser(@Param('id') id: number) {
        return this.userBusiness.deleteUser(id);
    }
};
