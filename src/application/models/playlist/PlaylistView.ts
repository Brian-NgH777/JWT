import Playlist from '../../entities/Playlist';

export default class PlaylistView {
    id: number;
    userId: number;
    name: string;
    slug: string;
    description?: string;
    screens: any;
    status: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: Playlist) {
        this.id = data.id;
        this.userId = data.userId;
        this.name = data.name;
        this.slug = data.slug;
        this.status = data.status;
        this.description = data.description;
        this.screens = data.screens;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    static parseArray(list: Playlist[]): PlaylistView[] {
        return list && Array.isArray(list) ? list.map(item => new PlaylistView(item)) : [];
    }
};
