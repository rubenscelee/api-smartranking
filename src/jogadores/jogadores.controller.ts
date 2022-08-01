import { Body, Controller, Delete, Get, Header, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { JogadorDto } from './dtos/criar-jogador-dto';
import { AtualizarJogadorDto} from './dtos/atualizar-jogador-dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';
 

@Controller('api/v1/jogadores')
export class JogadoresController {

  constructor(private readonly jogadoresService: JogadoresService){  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiBody({ type: JogadorDto})
  async criarJogador(@Body() jogadorDto: JogadorDto ){
    return await this.jogadoresService.criarJogador(jogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  @ApiBody({ type: JogadorDto})
  async atualizarJogador(@Body() AtualizarJogadorDto: AtualizarJogadorDto, @Param('_id', JogadoresValidacaoParametrosPipe) id: string): Promise<Jogador>{
    return await this.jogadoresService.atualizarJogador(id, AtualizarJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Get('/:_id')
  async consultarJogadorId(@Param('_id', JogadoresValidacaoParametrosPipe) id: string): Promise<Jogador>{
      return await this.jogadoresService.consultarJogadorPeloId(id);
  }
 
  @Delete('/:_id')
  async deletarJogador(@Param('_id', JogadoresValidacaoParametrosPipe) id: string): Promise<void> {
    return await this.jogadoresService.deletarJogador(id)
  }


}
