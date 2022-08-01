import { Document } from "mongoose";

export interface Jogador extends Document {
  nome: string;
  readonly telefoneCelular: string;
  readonly email: string;
  ranking: string;
  posicaoRanking: number;
  urlFotoJogador: string;
}