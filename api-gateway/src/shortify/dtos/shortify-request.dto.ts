import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TagDto } from './tag.dto';

export class ShortifyRequestDto {
    @IsString()
    @IsNotEmpty()
    public original_url: string;

    @IsString()
    @IsNotEmpty()
    public channel: string;

    @IsString()
    @IsOptional()
    public asset: string;

    @IsString()
    @IsOptional()
    public campaign: string;

    @IsArray()
    @IsOptional()
    @ValidateNested()
    @Type(() => TagDto)
    public tags: Array<TagDto>;
}
