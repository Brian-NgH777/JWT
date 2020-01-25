import { IsInt, IsString, MaxLength, Min, Max } from 'class-validator';

export default class RoleUpdate {
    @IsString()
    @MaxLength(50)
    name: string;

    @IsInt()
    @Min(1)
    @Max(100)
    level: number;
};
