import { IsString, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationDto } from './location.dto';

export class ClientDto {
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => LocationDto)
    public location: LocationDto;
}
