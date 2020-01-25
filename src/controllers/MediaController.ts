import * as multer from 'multer';
import { Service, Inject } from 'typedi';
import { JsonController, Authorized, Param, QueryParam, Body, Get, Post, Put, Delete, CurrentUser, UploadedFile } from 'routing-controllers';
import IMediaBusiness from '../application/businesses/interfaces/IMediaBusiness';
import MediaBusiness from '../application/businesses/MediaBusiness';
import MediaClaim from '../resources/permissions/MediaClaim';
import MediaCreate from '../application/models/media/MediaCreate';
import MediaUpdate from '../application/models/media/MediaUpdate';
import UserView from '../application/models/user/UserView';

@Service()
@JsonController('/media')
export default class MediaController {
    @Inject(() => MediaBusiness)
    private mediaBusiness: IMediaBusiness;

    @Get('/')
    @Authorized(MediaClaim.GET)
    findMedias(@CurrentUser() currentUser: UserView, @QueryParam('type') type: number, @QueryParam('keyword') keyword: string, @QueryParam('skip') skip: number, @QueryParam('limit') limit: number) {
        return this.mediaBusiness.findMedias(currentUser.id, type, keyword, skip, limit);
    }

    @Get('/:id([0-9]+)')
    @Authorized(MediaClaim.GET)
    getMedia(@Param('id') id: number) {
        return this.mediaBusiness.getMedia(id);
    }

    @Get('/media-by-code')
    @Authorized(MediaClaim.GET)
    getMediaByCode(@QueryParam('code') code: number) {
        return this.mediaBusiness.getMediaByCode(code);
    }

    @Post('/')
    @Authorized(MediaClaim.CREATE)
    createMedia(@Body() data: MediaCreate) {
        return this.mediaBusiness.createMedia(data);
    }

    @Post('/upload')
    @Authorized()
    uploadMedia(@CurrentUser() currentUser: UserView, @UploadedFile('media', { options: { storage: multer.memoryStorage() } }) file: any) {
        return this.mediaBusiness.uploadMedia(currentUser.id, file);
    }

    @Put('/:id([0-9]+)')
    @Authorized(MediaClaim.UPDATE)
    updateMedia(@Param('id') id: number, @Body() data: MediaUpdate) {
        return this.mediaBusiness.updateMedia(id, data);
    }

    @Put('/thumbnail/:id([0-9]+)')
    @Authorized()
    updateThumbnail(@CurrentUser() currentUser: UserView, @Param('id') id: number, @UploadedFile('media', { options: { storage: multer.memoryStorage() } }) file: any) {
        return this.mediaBusiness.updateThumbnail(currentUser.id, id, file);
    }

    @Delete('/:id([0-9]+)')
    // @Authorized(MediaClaim.DELETE)
    deleteMedia(@Param('id') id: number) {
        return this.mediaBusiness.deleteMedia(id);
    }
};
