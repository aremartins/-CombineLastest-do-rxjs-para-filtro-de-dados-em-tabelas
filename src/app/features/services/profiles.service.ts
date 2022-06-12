import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Profile } from '../models/tarefas';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  apiUrl = '../../../assets/mocks/profiles.json';
  constructor(private http: HttpClient) {
    this.getProfiles().pipe(tap(()=>console.log()))
  }


  getProfiles():Observable<Profile[]>{
    return this.http.get<Profile[]>(this.apiUrl)
  }
}
