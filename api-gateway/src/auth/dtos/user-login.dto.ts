import { IsString, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
    @IsNotEmpty()
    @IsString()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;
}
