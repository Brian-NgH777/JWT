import { IsOptional, IsEmail, IsString, Length, MaxLength, IsLowercase } from 'class-validator';

export default class UserSignup {
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

    @IsString()
    @IsOptional()
    @MaxLength(20)
    phone?: string;

    @IsString()
    @Length(6, 20)
    password: string;
};
