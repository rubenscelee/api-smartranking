import * as mongoose from 'mongoose'

export const CategoriaSchema = new mongoose.Schema({
  categoria: { type: String, unique: true },
  descricao: { type: String },
  eventos: [
    {
      nome: { type: String },
      operacao: { type: String },
      valor: { type: Number }
    }
  ],
  jogadores: [
    {
      nome: { type: String },
      telefoneCelular: { type: String },
      email: { type: String },
      ranking: { type: String },
      posicaoRanking: { type: Number },
      urlFotoJogador: { type: String }
    }
  ]
},
  {timestamps: true, collection: 'categorias'}
)