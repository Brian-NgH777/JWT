import { IsInt, IsString, IsOptional } from 'class-validator';

export default class MediaMusicInfo {
    @IsString()
    @IsOptional()
    url?: string;

    @IsInt()
    @IsOptional()
    size?: number;

    @IsString()
    @IsOptional()
    extension?: string;

    @IsInt()
    @IsOptional()
    bitrate?: number;

    @IsString()
    @IsOptional()
    duration?: string;

    @IsString()
    @IsOptional()
    width?: string;

    @IsString()
    @IsOptional()
    height?: string;
};
