import { Component, OnInit, ViewChild } from '@angular/core';
import { Tarefa } from 'src/app/shared/models/tarefa.model';
import { TarefaService } from '../services/tarefa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html',
  styleUrls: ['./editar-tarefa.component.css']
})
export class EditarTarefaComponent implements OnInit {

  @ViewChild("formTarefa") formTarefa!: NgForm;
  tarefa!: Tarefa;
  mensagem = ''
  private _custoFormatado: string = '';

  constructor(private tarefaService: TarefaService, private route: ActivatedRoute, private router: Router) { }

  get custoFormatado(): string {
    return this._custoFormatado;
  }

  set custoFormatado(valor: string) {
    this._custoFormatado = valor;
    this.tarefa.custo = this.desformatarValor(valor);
  }

  private desformatarValor(valorFormatado: string): number {
    const valorLimpo = valorFormatado.replace(/[R$\.,]/g, '');
    return valorLimpo ? parseFloat(valorLimpo) / 100 : 0;
  }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    const res = this.tarefaService.buscarPorId(id);
    if (res !== undefined)
      res.subscribe(dado => {
        this.tarefa = dado;
        if (this.tarefa.custo !== undefined && this.tarefa.custo !== null) {
          this.custoFormatado = this.formatarComoMoeda(this.tarefa.custo);
        }
      }, error => {
        console.error('Tarefa não encontrada: id = ' + id, error);
      });
  }

  atualizar(): void {
    if (this.formTarefa.form.valid) {
      this.tarefaService.atualizar(this.tarefa).subscribe(
        response => {
          console.log(this.tarefa)
          this.router.navigate(['/tarefas']);
        }, error => {
          console.error('Erro ao atualizar a tarefa', error);
          this.mensagem = 'Erro ao atualizar a tarefa.';
        });
    }
  }

  limparFormatacao(valorFormatado: string): number {
    if (!valorFormatado) return 0;
    const valorNumerico = valorFormatado.replace(/[R$\.,]/g, '').trim();
    return parseFloat(valorNumerico) / 100;
  }

  formatarComoMoeda(valorNumerico: number): string {
    return `R$ ${valorNumerico.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  }
}
