import Media from '../../entities/Media';
import UserReference from '../user/UserReference';
import { MediaType } from '../common/Enum';

export default class MediaImageReference {
    id: number;
    user: UserReference;
    type: MediaType;
    name: string;
    imageInfo?: any;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: Media) {
        this.id = data.id;
        this.user = new UserReference(data.user);
        this.type = data.type;
        this.name = data.name;
        this.imageInfo = data.imageInfo;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
};
