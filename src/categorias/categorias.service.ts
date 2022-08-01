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

  async consultarCategoriaId(id: string): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel.findOne({id}).exec();
  
    return categoriaEncontrada;
  }

  async deletarCategoria(id: string): Promise<any>{
    const categoriaParaDeletar = await this.categoriaModel.findOne({id}).exec();
      if(!categoriaParaDeletar){
        throw new NotFoundException(`Jogador com o id ${id} não encontrado`);
      }
      
    return await this.categoriaModel.deleteOne({id}).exec();
    
  }

  async atualizarCategoria(id: string, atualizarCategoriaDto: atualizarCategoriaDto): Promise<any> {
    const categoriaEncontrada = await this.categoriaModel.findOne({id}).exec();

    if (!categoriaEncontrada) {
      throw new NotFoundException(`Categoria com o id ${id} não encontrada`)
    }

    await this.categoriaModel.findOneAndUpdate({id : categoriaEncontrada.id},
      {$set: atualizarCategoriaDto}
      ).exec();

    return this.consultarCategoriaId(id);
  }


}
