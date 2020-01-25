import { Min, IsInt, MaxLength, IsString, IsIn, IsOptional } from 'class-validator';
import { MediaType } from '../common/Enum';

export default class MediaCreate {
    @IsInt()
    @Min(1)
    userId: number;

    @IsString()
    @MaxLength(200)
    name: string;

    @IsInt()
    @IsIn(Object.values(MediaType))
    type: MediaType;

    @IsInt()
    @IsOptional()
    thumbnailId?: number;

    @IsOptional()
    videoInfo?: any;

    @IsOptional()
    imageInfo?: any;
};
