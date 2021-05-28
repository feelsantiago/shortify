import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ActivityDto {
    @IsString()
    @IsNotEmpty()
    public tac: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public description?: string;
}
