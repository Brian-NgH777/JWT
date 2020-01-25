import Template from '../../entities/Template';
import CategoryReference from '../category/CategoryReference';
import RatioReference from '../ratio/RatioReference';

export default class TemplateView {
    id: number;
    code: number;
    name: string;
    category?: CategoryReference;
    ratio?: RatioReference;
    slug: string;
    isDrag: boolean;
    template?: any;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: Template) {
        this.id = data.id;
        this.code = data.code;
        this.name = data.name;
        this.slug = data.slug;
        this.isDrag = data.isDrag;
        this.category = data.category && new CategoryReference(data.category);
        this.ratio = data.ratio && new RatioReference(data.ratio);
        this.template = data.template;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    static parseArray(list: Template[]): TemplateView[] {
        return list && Array.isArray(list) ? list.map(item => new TemplateView(item)) : [];
    }
};
