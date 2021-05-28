import { IsString, IsNotEmpty } from 'class-validator';

export class TagDto {
    @IsString()
    @IsNotEmpty()
    public key: string;

    @IsString()
    @IsNotEmpty()
    public value: string;
}
