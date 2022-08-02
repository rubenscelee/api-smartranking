import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { atualizarCategoriaDto } from './dtos/atualizar-categoria-dto';

@Injectable()
export class CategoriasService {
   
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>
  ){}

  async criarCategoria(CriarCategoriaDto: CriarCategoriaDto): Promise<CriarCategoriaDto> {
    const { categoria } = CriarCategoriaDto;
    const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();

    if(categoriaEncontrada){
      throw new BadRequestException(`Categoria ${categoria} já cadastrada!`)!
    }

    const categoriaCriada = new this.categoriaModel(CriarCategoriaDto);

    return await  categoriaCriada.save();
  } 

  async consultarCategorias(): Promise<Categoria[]> {
    return await this.categoriaModel.find().exec();
  }

  async consultarCategoriaId(categoria: string): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();
  
    return categoriaEncontrada;
  }

  async deletarCategoria(categoria: string): Promise<any>{
    const categoriaParaDeletar = await this.categoriaModel.findOne({categoria}).exec();
      if(!categoriaParaDeletar){
        throw new NotFoundException(`Jogador com o id ${categoria} não encontrado`);
      }
      
    return await this.categoriaModel.deleteOne({categoria}).exec();
    
  }

  async atualizarCategoria(categoria: string, atualizarCategoriaDto: atualizarCategoriaDto): Promise<any> {
    const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();

    if (!categoriaEncontrada) {
      throw new NotFoundException(`Categoria com o id ${categoria} não encontrada`)
    }

    await this.categoriaModel.findOneAndUpdate({categoria : categoriaEncontrada.categoria},
      {$set: atualizarCategoriaDto}
      ).exec();

    return this.consultarCategoriaId(categoria);
  }

  //Adiciona um jogador a categoria
  async atribuirCategoriaJogador(params: string[]): Promise<void> {
    
    const categoria = params['categoria'];
    const idJogador = params['idJogador']


  }


}
