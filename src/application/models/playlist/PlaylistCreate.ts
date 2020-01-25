import { IsInt, Min, IsOptional, MaxLength, IsString } from 'class-validator';
export default class PlaylistCreate {
    @IsInt()
    @Min(1)
    userId: number;

    @IsString()
    @MaxLength(300)
    name: string;

    @IsString()
    @MaxLength(300)
    slug: string;

    @IsString()
    @MaxLength(2000)
    description?: string;

    @IsOptional()
    screens?: any;
};
