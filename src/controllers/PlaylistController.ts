import { Service, Inject } from 'typedi';
import { JsonController, Authorized, Param, QueryParam, Body, Get, Post, Put, Delete, CurrentUser } from 'routing-controllers';
import IPlaylistBusiness from '../application/businesses/interfaces/IPlaylistBusiness';
import PlaylistBusiness from '../application/businesses/PlaylistBusiness';
import PlaylistClaim from '../resources/permissions/PlaylistClaim';
import PlaylistCreate from '../application/models/playlist/PlaylistCreate';
import PlaylistUpdate from '../application/models/playlist/PlaylistUpdate';
import UserView from '../application/models/user/UserView';

@Service()
@JsonController('/playlist')
export default class PlaylistController {
    @Inject(() => PlaylistBusiness)
    private playlistBusiness: IPlaylistBusiness;

    @Get('/')
    @Authorized(PlaylistClaim.GET)
    findPlaylists(@CurrentUser() currentUser: UserView, @QueryParam('keyword') keyword: string, @QueryParam('skip') skip: number, @QueryParam('limit') limit: number) {
        return this.playlistBusiness.findPlaylists(currentUser.id, keyword, skip, limit);
    }

    @Get('/:id([0-9]+)')
    @Authorized(PlaylistClaim.GET)
    getPlaylist(@Param('id') id: number) {
        return this.playlistBusiness.getPlaylist(id);
    }

    @Get('/playlist')
    @Authorized(PlaylistClaim.GET)
    getPlaylistBySlug(@QueryParam('slug') slug: string) {
        return this.playlistBusiness.getPlaylistBySlug(slug);
    }

    @Post('/')
    @Authorized(PlaylistClaim.CREATE)
    createPlaylist(@Body() data: PlaylistCreate) {
        return this.playlistBusiness.createPlaylist(data);
    }

    @Put('/:id([0-9]+)')
    // @Authorized(PlaylistClaim.UPDATE)
    updatePlaylist(@Param('id') id: number, @Body() data: PlaylistUpdate) {
        return this.playlistBusiness.updatePlaylist(id, data);
    }

    @Delete('/:id([0-9]+)')
    @Authorized(PlaylistClaim.DELETE)
    deletePlaylist(@Param('id') id: number) {
        return this.playlistBusiness.deletePlaylist(id);
    }
};
