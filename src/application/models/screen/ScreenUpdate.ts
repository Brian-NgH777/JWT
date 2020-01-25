import { MaxLength, IsString, IsOptional } from 'class-validator';
import Template from '../../entities/Template';

export default class ScreenUpdate {
    @IsOptional()
    template?: Template;

    @IsString()
    @MaxLength(200)
    name: string;

    @IsString()
    @MaxLength(300)
    slug?: string;

    @IsOptional()
    categoryId?: number;

    @IsOptional()
    ratioId?: number;
};
