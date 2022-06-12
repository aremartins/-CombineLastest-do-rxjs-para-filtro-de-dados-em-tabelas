import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Estados } from '../models/estados';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  private readonly apiEstados  = '../../../assets/mocks/estados.json'
  constructor(private http: HttpClient) {
    this.getEstados()
   }

   getEstados(): Observable<Estados[]>{
      return this.http.get<Estados[]>(this.apiEstados).pipe(take(1))
   }
}
