import { Component, OnInit, ViewChild } from '@angular/core';
import { Tarefa } from 'src/app/shared/models/tarefa.model';
import { TarefaService } from '../services/tarefa.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inserir-tarefa',
  templateUrl: './inserir-tarefa.component.html',
  styleUrls: ['./inserir-tarefa.component.css']
})
export class InserirTarefaComponent implements OnInit {

  @ViewChild('formTarefa') formTarefa!: NgForm;
  tarefa!: Tarefa;
  mensagem = ''

  constructor(private tarefaService: TarefaService, private router: Router) { }

  ngOnInit(): void {
    this.tarefa = new Tarefa();
  }

  inserir(): void {
    if (this.formTarefa.form.valid) {
      this.tarefaService.listarTodos().subscribe(todasTarefas => {
        if (todasTarefas.some(tarefa => tarefa.nome === this.tarefa.nome)) {
          this.mensagem = 'Tarefa já registrada!';
          return;
        }

        const maxId = Math.max(...todasTarefas.filter(tarefa => tarefa.tarefaId !== undefined).map(tarefa => tarefa.tarefaId!));
        const maxOrdem = Math.max(...todasTarefas.filter(tarefa => tarefa.ordemApresentacao !== undefined).map(tarefa => tarefa.ordemApresentacao!));
        const resultadoFinal = maxOrdem === -Infinity ? 0 : maxOrdem;
        const novaTarefa: Tarefa = {
          nome: this.tarefa.nome,
          custo: this.tarefa.custo = this.limparFormatacao(this.tarefa.custo!.toString()),
          dataLimite: this.tarefa.dataLimite,
          ordemApresentacao: resultadoFinal + 1
        };
        console.log(novaTarefa);
        this.tarefaService.inserir(novaTarefa).subscribe((response: Tarefa) => {
          this.router.navigate(["/tarefas"]);
        });
      });
    }
  }

  limparFormatacao(valorFormatado: string): number {
    if (!valorFormatado) return 0;
    const valorNumerico = valorFormatado.replace(/[R$\.,]/g, '').trim();
    return parseFloat(valorNumerico) / 100;
  }

}
