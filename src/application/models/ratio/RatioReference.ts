import Ratio from '../../entities/Ratio';

export default class RatioReference {
    id: number;
    name: string;
    value: string;
    description: string;
    type: number;

    constructor(data: Ratio) {
        this.id = data.id;
        this.name = data.name;
        this.value = data.value;
        this.description = data.description;
        this.type = data.type;
    }
};
