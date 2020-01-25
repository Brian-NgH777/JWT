import Media from '../../entities/Media';
import UserReference from '../user/UserReference';
import MediaImageReference from './MediaImageReference';
import { MediaType } from '../common/Enum';

export default class MediaView {
    id: number;
    user: UserReference;
    type: MediaType;
    name: string;
    thumbnail?: MediaImageReference;
    videoInfo?: any;
    imageInfo?: any;
    musicInfo?: any;        // eslint-disable-line
    createdAt: Date;
    updatedAt: Date;

    constructor(data: Media) {
        this.id = data.id;
        this.user = new UserReference(data.user);
        this.type = data.type;
        this.name = data.name;
        this.thumbnail = data.thumbnail && new MediaImageReference(data.thumbnail);
        this.videoInfo = data.videoInfo;
        this.imageInfo = data.imageInfo;
        this.musicInfo = data.musicInfo;            // eslint-disable-line
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    static parseArray(list: Media[]): MediaView[] {
        return list && Array.isArray(list) ? list.map(item => new MediaView(item)) : [];
    }
};
