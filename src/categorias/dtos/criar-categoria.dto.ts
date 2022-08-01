import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";
import { Evento } from "../interfaces/categoria.interface";
import { ApiProperty } from "@nestjs/swagger";

export class CriarCategoriaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly categoria: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  eventos: Array<Evento>

}