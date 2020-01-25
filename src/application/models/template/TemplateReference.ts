import Template from '../../entities/Template';
import CategoryReference from '../category/CategoryReference';
import RatioReference from '../ratio/RatioReference';

export default class TemplateReference {
    id: number;
    code: number;
    category?: CategoryReference;
    ratio?: RatioReference;
    name: string;
    slug: string;
    template?: any;

    constructor(data: Template) {
        this.id = data.id;
        this.code = data.code;
        this.category = data.category && new CategoryReference(data.category);
        this.ratio = data.ratio && new RatioReference(data.ratio);
        this.code = data.code;
        this.name = data.name;
        this.slug = data.slug;
        this.template = data.template;
    }

    static parseArray(list: Template[]): TemplateReference[] {
        return list && Array.isArray(list) ? list.map(item => new TemplateReference(item)) : [];
    }
};
