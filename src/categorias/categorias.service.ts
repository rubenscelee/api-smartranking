import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { atualizarCategoriaDto } from './dtos/atualizar-categoria-dto';
import { JogadoresService } from 'src/jogadores/jogadores.service';

@Injectable()
export class CategoriasService {
   
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    private readonly JogadoresService: JogadoresService
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
    return await this.categoriaModel.find().populate("jogadores").exec();
    //método populate faz com que todas as informações da collection jogadores apareça na consulta
  }

  async consultarCategoriaId(categoria: string): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();
  
    return categoriaEncontrada;
  }

  async deletarCategoria(categoria: string): Promise<any>{
    const categoriaParaDeletar = await this.categoriaModel.findOne({categoria}).exec();
      if(!categoriaParaDeletar){
        throw new NotFoundException(`Categoria ${categoria} não encontrada`);
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
    const idJogador = params['idJogador'];

    const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();

    //Verifica se o jogador já está cadastrado na categoria
    const jogadorJaCadastradoCategoria = await this.categoriaModel.find({categoria}).where('jogadores').in(idJogador).exec();

    await this.JogadoresService.consultarJogadorPeloId(idJogador);


    if(!categoriaEncontrada){
      throw new BadRequestException(`Categoria ${categoria} não cadastrada!`);
    }

    if(jogadorJaCadastradoCategoria.length > 0){
      throw new BadRequestException(`Jogador ${idJogador} já cadastrado na categoria ${categoria}!`);
    }

    categoriaEncontrada.jogadores.push(idJogador);
    await this.categoriaModel.findByIdAndUpdate({categoria}, {$set: categoriaEncontrada}).exec();

  }

}
