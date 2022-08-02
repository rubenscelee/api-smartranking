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

  @Get('/:categoria')
  async consultarCategoriaId(@Param('categoria')categoria: string): Promise<Categoria>{
    return await this.categoriaService.consultarCategoriaId(categoria);
  }

  @Delete('/:categoria')
  async deletarCategoria(@Param('categoria') categoria: string): Promise<Categoria>{
    return await this.categoriaService.deletarCategoria(categoria);
  }

  @Put('/:categoria')
  @UsePipes(ValidationPipe)    
  async atualizarCategoria(@Param('categoria') categoria: string, @Body() atualizarCategoriaDto: atualizarCategoriaDto): Promise<any> {
    return await this.categoriaService.atualizarCategoria(categoria, atualizarCategoriaDto);
  }

  @Post('/:categoria/jogadores/:idJogador')  
  async atribuirCategoriaJogador(@Param() params: string[]): Promise<void>{
    return await this.categoriaService.atribuirCategoriaJogador(params);
  }

}
