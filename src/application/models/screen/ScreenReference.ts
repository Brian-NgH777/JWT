import Screen from '../../entities/Screen';
import Template from '../../entities/Template';
import CategoryReference from '../category/CategoryReference';
import RatioReference from '../ratio/RatioReference';
export default class ScreenReference {
    id: number;
    userId: number;
    category: CategoryReference;
    ratio: RatioReference;
    template?: Template;
    name: string;
    slug?: string;

    constructor(data: Screen) {
        this.id = data.id;
        this.userId = data.userId;
        this.category = new CategoryReference(data.category);
        this.ratio = new RatioReference(data.ratio);
        this.template = data.template;
        this.name = data.name;
        this.slug = data.slug;
    }

    static parseArray(list: Screen[]): ScreenReference[] {
        return list && Array.isArray(list) ? list.map(item => new ScreenReference(item)) : [];
    }
};
