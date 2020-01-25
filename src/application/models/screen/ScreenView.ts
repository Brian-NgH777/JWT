import Screen from '../../entities/Screen';
import Template from '../../entities/Template';
import CategoryReference from '../category/CategoryReference';
import RatioReference from '../ratio/RatioReference';

export default class ScreenView {
    id: number;
    userId: number;
    category?: CategoryReference;
    ratio?: RatioReference;
    template?: Template;
    name: string;
    slug?: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: Screen) {
        this.id = data.id;
        this.userId = data.userId;
        this.category = data.category && new CategoryReference(data.category);
        this.ratio = data.ratio && new RatioReference(data.ratio);
        this.template = data.template;
        this.name = data.name;
        this.slug = data.slug;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    static parseArray(list: Screen[]): ScreenView[] {
        return list && Array.isArray(list) ? list.map(item => new ScreenView(item)) : [];
    }
};
