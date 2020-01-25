import MediaView from '../../models/media/MediaView';
import MediaCreate from '../../models/media/MediaCreate';
import MediaUpdate from '../../models/media/MediaUpdate';
import ResultList from '../../models/common/ResultList';

interface IMediaBusiness {
    findMedias(userId: number, type?: number, keyword?: string, skip?: number, limit?: number): Promise<ResultList<MediaView>>;

    getMedia(id: number): Promise<MediaView | undefined>;

    getMediaByCode(code: number): Promise<MediaView | undefined>;

    createMedia(data: MediaCreate): Promise<MediaView | undefined>;

    uploadMedia(id: number, data: any): Promise<string>;

    updateMedia(id: number, data: MediaUpdate): Promise<boolean>;

    updateThumbnail(userId: number, id: number, data: any): Promise<any>;

    deleteMedia(id: number): Promise<boolean>;

    initialMedias(data: {isRequired?: boolean, data: any}[], isRequired?: boolean): Promise<boolean>;
}

export default IMediaBusiness;
