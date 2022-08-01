import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

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


}
