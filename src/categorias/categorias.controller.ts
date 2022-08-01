import { Controller } from '@nestjs/common';
import { CategoriasService } from './categorias.service';

@Controller('api/v1/categorias')
export class CategoriasController {

  constructor(private readonly categoriaService: CategoriasService){}

  

}
