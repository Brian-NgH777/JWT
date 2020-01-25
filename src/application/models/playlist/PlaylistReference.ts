import Playlist from '../../entities/Playlist';

export default class PlaylistReference {
    id: number;
    userId: number;
    name: string;
    slug: string;
    description?: string;
    screens?: any;


    constructor(data: Playlist) {
        this.id = data.id;
        this.userId = data.userId;
        this.name = data.name;
        this.slug = data.slug;
        this.description = data.description;
        this.screens = data.screens;
    }

    static parseArray(list: Playlist[]): PlaylistReference[] {
        return list && Array.isArray(list) ? list.map(item => new PlaylistReference(item)) : [];
    }
};
