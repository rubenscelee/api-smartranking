import * as mongoose from 'mongoose'

export const JogadorSchema = new mongoose.Schema({
  nome: { type: String },
  telefoneCelular: { type: String },
  email: { type: String, unique: true },
  ranking: { type: String },
  posicaoRanking: { type: Number },
  urlFotoJogador: { type: String }
},
  {timestamps: true, collection: 'jogadores'}
)
 
//timestamps: cria os campos createdAt e UpdeatedAt