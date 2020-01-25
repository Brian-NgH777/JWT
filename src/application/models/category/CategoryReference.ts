import Category from '../../entities/Category';

export default class CategoryReference {
    id: number;
    name: string;
    value: string;

    constructor(data: Category) {
        this.id = data.id;
        this.name = data.name;
        this.value = data.value;
    }
};
