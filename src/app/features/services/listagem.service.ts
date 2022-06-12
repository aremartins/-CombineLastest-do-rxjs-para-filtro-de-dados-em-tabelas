import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Investidores } from '../models/tarefas';

@Injectable({
  providedIn: 'root'
})
export class ListagemService {

  constructor(private http: HttpClient) { }


  getInvestidor(){
    return this.http.get<Investidores[]>('http://localhost:3000/investors').pipe((
      map((investidor) => investidor.sort((investidorA, investidorB)=> this.sortByName(investidorA, investidorB)))
    ))
  }

  private sortByName(investidorA: Investidores, investidorB: Investidores) {
    if (investidorA.nome > investidorB.nome) {
      return 1;
    }
    if (investidorA.nome < investidorB.nome) {
      return -1;
    }
    return 0;
  }

}
