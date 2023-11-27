import { Injectable } from '@angular/core';
import { Tarefa } from 'src/app/shared/models/tarefa.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private apiUrl = 'https://aw-tarefas-api-caab5d3e89a7.herokuapp.com/';

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${this.apiUrl}tarefas`);
  }

  inserir(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(`${this.apiUrl}tarefas`, tarefa);
  }

  buscarPorId(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.apiUrl}tarefas/${id}`);
  }

  atualizar(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.apiUrl}tarefas/${tarefa.tarefaId}`, tarefa);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}tarefas/${id}`);
  }
}
