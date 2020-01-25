import { IsOptional, MaxLength, IsString } from 'class-validator';
export default class PlaylistUpdate {
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
