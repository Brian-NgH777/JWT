import { MaxLength, IsString, Min, IsInt } from 'class-validator';
export default class RatioCreate {
    @IsString()
    @MaxLength(50)
    name: string;

    @IsString()
    @MaxLength(50)
    value: string;

    @IsString()
    @MaxLength(60)
    description: string;

    @IsInt()
    @Min(1)
    type: number;
};
