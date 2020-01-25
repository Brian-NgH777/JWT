import Ratio from '../../entities/Ratio';

export default class RatioView {
    id: number;
    name: string;
    value: string;
    description: string;
    type: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: Ratio) {
        this.id = data.id;
        this.name = data.name;
        this.value = data.value;
        this.description = data.description;
        this.type = data.type;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    static parseArray(list: Ratio[]): RatioView[] {
        return list && Array.isArray(list) ? list.map(item => new RatioView(item)) : [];
    }
};
