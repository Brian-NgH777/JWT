import PlaylistView from '../../models/playlist/PlaylistView';
import PlaylistCreate from '../../models/playlist/PlaylistCreate';
import PlaylistUpdate from '../../models/playlist/PlaylistUpdate';
import ResultList from '../../models/common/ResultList';

interface IPlaylistBusiness {
    findPlaylists(userId: number, keyword?: string, skip?: number, limit?: number): Promise<ResultList<PlaylistView>>;

    getPlaylist(id: number): Promise<PlaylistView | undefined>;

    getPlaylistBySlug(slug: string): Promise<PlaylistView | undefined>;

    createPlaylist(data: PlaylistCreate): Promise<PlaylistView | undefined>;

    updatePlaylist(id: number, data: PlaylistUpdate): Promise<boolean>;

    deletePlaylist(id: number): Promise<boolean>;
}

export default IPlaylistBusiness;
