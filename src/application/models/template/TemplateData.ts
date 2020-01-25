import { IsString, IsOptional } from 'class-validator';

export default class TemplateData {
    @IsString()
    @IsOptional()
    key: string;

    @IsString()
    @IsOptional()
    path: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsOptional()
    style?: any;

    @IsOptional()
    setting?: any;

    @IsOptional()
    components?: any;
};
