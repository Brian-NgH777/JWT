import { MaxLength, IsString, IsOptional, IsBoolean } from 'class-validator';
import TemplateData from './TemplateData';

export default class TemplateUpdate {
    @IsString()
    @MaxLength(50)
    name: string;

    @IsOptional()
    categoryId?: number;

    @IsOptional()
    ratioId?: number;

    @IsString()
    @MaxLength(300)
    slug: string;

    @IsBoolean()
    isDrag?: boolean;

    @IsOptional()
    template?: TemplateData;
};
