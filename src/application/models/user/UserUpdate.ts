import { IsOptional, IsEmail, IsInt, IsString, Length, MaxLength, IsIn, IsLowercase } from 'class-validator';
import { IsDateAndParse } from '../../../system/CustomDecorator';
import { Gender } from '../common/Enum';

export default class UserUpdate {
    @IsString()
    @MaxLength(20)
    firstName: string;

    @IsString()
    @IsOptional()
    @MaxLength(20)
    lastName?: string;

    @IsEmail()
    @IsLowercase()
    @MaxLength(200)
    email: string;

    @IsInt()
    @IsOptional()
    @IsIn(Object.values(Gender))
    gender?: Gender;

    @IsDateAndParse()
    @IsOptional()
    birthday?: Date;

    @IsString()
    @IsOptional()
    @MaxLength(20)
    phone?: string;

    @IsString()
    @IsOptional()
    @MaxLength(200)
    address?: string;

    @IsString()
    @IsOptional()
    @MaxLength(5)
    culture?: string;

    @IsString()
    @IsOptional()
    @Length(3, 3)
    currency?: string;
};
