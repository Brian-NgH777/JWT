import { MaxLength, IsString } from 'class-validator';
export default class CategoryCreate {
    @IsString()
    @MaxLength(50)
    name: string;

    @IsString()
    @MaxLength(50)
    value: string;
};
