import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCitaDto {
  @IsDateString()
  fecha !: string;

  @IsNotEmpty()
  hora !: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}