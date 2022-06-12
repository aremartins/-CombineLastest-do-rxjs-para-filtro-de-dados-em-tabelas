import { ProfilesService } from './../services/profiles.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  map,
  switchMap,
  Observable,
  startWith
} from 'rxjs';
import { Investidores, Profile } from '../models/tarefas';
import { ListagemService } from '../services/listagem.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent implements OnInit {
  profile: FormControl;
  pesquisa: FormControl;
  filter$: Observable<string>;
  filterProfile$: Observable<string>
  investidors: Investidores[] = [];
  investidors$: Observable<Investidores[]>;
  investidorsFiltereds$: Observable<Investidores[]>;
  perfis: Profile[] = [];

  constructor(
    private listagemService: ListagemService,
    private profileService: ProfilesService
  ) {

    this.investidors$ = this.listagemService.getInvestidor();
    this.pesquisa = new FormControl('');
    this.profile = new FormControl('');
    this.filter$ = this.pesquisa.valueChanges.pipe(
      startWith(''),
      debounceTime(300)
    );
    this.filterProfile$ = this.profile.valueChanges.pipe(
      startWith('')
    )


    this.investidorsFiltereds$ = combineLatest(this.investidors$, this.filter$, this.filterProfile$).pipe(
      map(([investidor, filterString, filterProfile]) =>
        investidor.filter(
          (investidor) =>
            investidor.nome.toLowerCase().indexOf(filterString.toLowerCase()) !==
            -1 &&
            investidor.profile.nivel.toLowerCase().indexOf(filterProfile.toLowerCase()) !== -1
        )
      )
    )
  }

  ngOnInit(): void {
    this.profileService
      .getProfiles()
      .subscribe((dados) => (this.perfis = dados));
  }

  onSelect(evento:any){

}
}














//this.listagemService
    //   .getInvestidor()
    //   .subscribe((dados) => (this.investidors = dados));
