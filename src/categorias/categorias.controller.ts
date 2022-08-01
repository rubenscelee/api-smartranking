import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Validate } from 'class-validator';
import { CategoriasService } from './categorias.service';
import { atualizarCategoriaDto } from './dtos/atualizar-categoria-dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';
 

@Controller('api/v1/categorias')
export class CategoriasController {

  constructor(private readonly categoriaService: CategoriasService){}

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategoria(@Body()CriarCategoriaDto: CriarCategoriaDto ) {
    return await this.categoriaService.criarCategoria(CriarCategoriaDto);
  } 

  @Get()
  async consultarCategorias(): Promise<Categoria[]>{
    return await this.categoriaService.consultarCategorias();
  }

  @Get(':id')
  async consultarCategoriaId(@Param()id: string): Promise<Categoria>{
    return await this.categoriaService.consultarCategoriaId(id);
  }

  @Delete(':id')
  async deletarCategoria(@Param() id: string): Promise<Categoria>{
    return await this.categoriaService.deletarCategoria(id);
  }

  @Put(':id')
  async atualizarCategoria(@Param() id: string, @Body() atualizarCategoriaDto: atualizarCategoriaDto): Promise<any> {
    return await this.categoriaService.atualizarCategoria(id, atualizarCategoriaDto);
  }

}
