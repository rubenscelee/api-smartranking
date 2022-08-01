import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Validate } from 'class-validator';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
 

@Controller('api/v1/categorias')
export class CategoriasController {

  constructor(private readonly categoriaService: CategoriasService){}

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategoria(@Body()CriarCategoriaDto: CriarCategoriaDto ): Promise<CriarCategoriaDto> {
    return await this.categoriaService.criarCategoria(CriarCategoriaDto);
  } 

}
