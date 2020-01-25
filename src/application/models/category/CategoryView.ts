import Category from '../../entities/Category';

export default class CategoryView {
    id: number;
    name: string;
    value: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: Category) {
        this.id = data.id;
        this.name = data.name;
        this.value = data.value;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    static parseArray(list: Category[]): CategoryView[] {
        return list && Array.isArray(list) ? list.map(item => new CategoryView(item)) : [];
    }
};
