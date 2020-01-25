import { IsInt, IsString, IsOptional } from 'class-validator';

export default class MediaImageInfo {
    @IsString()
    @IsOptional()
    url?: string;

    @IsInt()
    @IsOptional()
    size?: number;

    @IsString()
    @IsOptional()
    extension?: string;

    @IsOptional()
    info?: any;

    @IsString()
    @IsOptional()
    width?: string;

    @IsString()
    @IsOptional()
    height?: string;
};
