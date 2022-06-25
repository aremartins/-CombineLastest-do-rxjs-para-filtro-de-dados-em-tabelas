import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs';
import { Investidores } from '../models/tarefas';

@Injectable({
  providedIn: 'root'
})
export class ListagemService {
readonly API = 'http://localhost:3000/investors'
  constructor(private http: HttpClient) { }


  getInvestidor(){
    return this.http.get<Investidores[]>('http://localhost:3000/investors').pipe((
      map((investidor) => investidor.sort((investidorA, investidorB)=> this.sortByName(investidorA, investidorB)))
    ))
  }

  getById(id:any){
    return this.http.get<Investidores>(`${this.API}/${id}`).pipe(take(1))
  }

  postInvestor(investidor:Investidores){
    return this.http.post<Investidores>('http://localhost:3000/investors', investidor)
  }

  putInvestidor(investidor: Investidores){
    return this.http.put(`${this.API}/${investidor.id}`, investidor).pipe(take(1))
  }

  patchInvestidor(investidor: Investidores){
    return this.http.put(`${this.API}/${investidor.id}`, investidor).pipe(take(1))
  }

  getFile(files: Set<File>, url: string){
    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name))

    const request = new HttpRequest('POST', url, formData )
    return this.http.request(request)
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
