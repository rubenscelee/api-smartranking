import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadorDto } from './dtos/criar-jogador-dto';
import { AtualizarJogadorDto} from './dtos/atualizar-jogador-dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>
  ){}
  
  async criarJogador(jogadorDto: JogadorDto): Promise<Jogador>{

    const { email } = jogadorDto;
    const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

    if(jogadorEncontrado){
      throw new BadRequestException(`Jogador com e-mail ${email} já cadastrado!`)!
    }

    const jogadorCriado = new this.jogadorModel(jogadorDto);

    return await  jogadorCriado.save();

  }

  async atualizarJogador(id: string, AtualizarJogadorDto: AtualizarJogadorDto): Promise<any>{

    const jogadorEncontrado = await this.jogadorModel.findOne({id}).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com o id ${id} não encontrado`)
    }

    await this.jogadorModel.findOneAndUpdate({id : jogadorEncontrado.id},
      {$set: AtualizarJogadorDto}
      ).exec();

    return this.consultarJogadorPeloId(id);

  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec()
  }

  async consultarJogadorPeloId(id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({id}).exec();
    if (!jogadorEncontrado) {
        throw new NotFoundException(`Jogador com o id ${id} não encontrado`)
    }
    return jogadorEncontrado
  }

  async deletarJogador(id: string): Promise<any> {
      const jogadorParaDeletar = await this.jogadorModel.findOne({id}).exec();
      if(!jogadorParaDeletar){
        throw new NotFoundException(`Jogador com o id ${id} não encontrado`);
      }
      return await this.jogadorModel.deleteOne({id}).exec();
     
  }

}
