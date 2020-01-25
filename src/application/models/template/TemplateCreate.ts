import { Min, IsInt, IsOptional, MaxLength, IsString, IsBoolean } from 'class-validator';
import TemplateData from './TemplateData';
export default class TemplateCreate {
    @IsInt()
    @Min(1)
    userId: number;

    @IsOptional()
    categoryId?: number;

    @IsOptional()
    ratioId?: number;

    @IsInt()
    @Min(1)
    code: number;

    @IsString()
    @MaxLength(50)
    name: string;

    @IsString()
    @MaxLength(300)
    slug: string;

    @IsBoolean()
    isDrag: boolean;

    @IsOptional()
    template?: TemplateData;
};
