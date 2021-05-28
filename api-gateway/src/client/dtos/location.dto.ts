import { IsString, IsNotEmpty } from 'class-validator';

export class LocationDto {
    @IsString()
    @IsNotEmpty()
    public address: string;

    @IsString()
    @IsNotEmpty()
    public city: string;

    @IsString()
    @IsNotEmpty()
    public province: string;

    @IsString()
    @IsNotEmpty()
    public country: string;

    @IsString()
    @IsNotEmpty()
    public postal_code: string;
}
