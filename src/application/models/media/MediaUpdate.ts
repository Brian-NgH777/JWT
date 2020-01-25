import { MaxLength, IsString, IsInt, IsOptional } from 'class-validator';

export default class MediaUpdate {
    @IsString()
    @MaxLength(200)
    name: string;

    @IsInt()
    @IsOptional()
    thumbnailId?: number;

    @IsOptional()
    videoInfo?: any;

    @IsOptional()
    imageInfo?: any;
};
