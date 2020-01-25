import { IsString, Length } from 'class-validator';

export default class PasswordReset {
    @IsString()
    @Length(6, 20)
    newPassword: string;

    @IsString()
    @Length(6, 20)
    keyRandom: string;
};
