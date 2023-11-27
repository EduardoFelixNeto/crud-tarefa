import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TarefaService } from './services/tarefa.service';
import { ListarTarefaComponent } from './listar-tarefa/listar-tarefa.component';
import { InserirTarefaComponent } from './inserir-tarefa/inserir-tarefa.component';
import { EditarTarefaComponent } from './editar-tarefa/editar-tarefa.component';
import { CurrencyMaskDirective } from '../shared/directives/currency-mask.directive';



@NgModule({
  declarations: [
    ListarTarefaComponent,
    InserirTarefaComponent,
    EditarTarefaComponent,
    CurrencyMaskDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers:[
    TarefaService
  ]
})
export class TarefaModule { }
