import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarTarefaComponent } from './tarefa/listar-tarefa/listar-tarefa.component';
import { InserirTarefaComponent } from './tarefa/inserir-tarefa/inserir-tarefa.component';
import { EditarTarefaComponent } from './tarefa/editar-tarefa/editar-tarefa.component';

const routes: Routes = [
  { path: '',
    redirectTo: 'tarefas/listar',
    pathMatch: 'full'
  },
  { path: 'tarefas',
    redirectTo: 'tarefas/listar'
  },
  {
    path: 'tarefas/listar',
    component: ListarTarefaComponent
  },
  {
    path: 'tarefas/novo',
    component: InserirTarefaComponent
  },
  {
    path: 'tarefas/editar/:id',
    component: EditarTarefaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
