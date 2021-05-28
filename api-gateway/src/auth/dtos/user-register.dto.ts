import { IsString, IsNotEmpty } from 'class-validator';

export class UserRegisterDto {
    @IsNotEmpty()
    @IsString()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    public role: string;
}
