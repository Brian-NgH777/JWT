import { Min, IsInt, MaxLength, IsString, IsOptional } from 'class-validator';
import Template from '../../entities/Template';

export default class ScreenCreate {
    @IsInt()
    @Min(1)
    userId: number;

    @IsOptional()
    categoryId?: number;

    @IsOptional()
    ratioId?: number;

    @IsString()
    @MaxLength(200)
    name: string;

    @IsString()
    @MaxLength(300)
    slug?: string;

    @IsOptional()
    template?: Template;
};
