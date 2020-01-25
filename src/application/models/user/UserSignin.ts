import { IsOptional, IsEmail, Min, IsInt, IsString, Length, MaxLength, IsLowercase } from 'class-validator';

export default class UserSignin {
    @IsEmail()
    @IsLowercase()
    @MaxLength(200)
    email: string;

    @IsString()
    @Length(6, 20)
    password: string;

    @IsInt()
    @IsOptional()
    @Min(1)
    expiredInMS?: number;
};
