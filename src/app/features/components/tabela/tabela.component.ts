import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  combineLatest,
  debounceTime,
  map,
  Observable,
  startWith,
} from 'rxjs';
import { Investidores, Profile } from '../../models/tarefas';
import { ListagemService } from '../../services/listagem.service';
import { ProfilesService } from '../../services/profiles.service';
@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {

  estados: FormControl;
  profile: FormControl;
  pesquisa: FormControl;
  filter$: Observable<string>;
  filterProfile$: Observable<string>;
  filterEstados$: Observable<string>;
  investidors: Investidores[] = [];
  investidors$: Observable<Investidores[]>;
  investidorsFiltereds$: Observable<Investidores[]>;
  perfis: Profile[] = [];

  constructor(
    private listagemService: ListagemService,
    private profileService: ProfilesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.investidors$ = this.listagemService.getInvestidor();
    this.pesquisa = new FormControl('');
    this.estados = new FormControl('');
    this.profile = new FormControl('');
    this.filter$ = this.pesquisa.valueChanges.pipe(
      startWith(''),
      debounceTime(300)
    );
    this.filterProfile$ = this.profile.valueChanges.pipe(startWith(''));
    this.filterEstados$ = this.estados.valueChanges.pipe(
      startWith(''),
      debounceTime(300)
    );

    this.investidorsFiltereds$ = combineLatest(
      this.investidors$,
      this.filter$,
      this.filterProfile$,
      this.filterEstados$
    ).pipe(
      map(([investidor, filterString, filterProfile, filterEstados]) =>
        investidor.filter(
          (investidor) =>
            investidor.nome
              .toLowerCase()
              .indexOf(filterString.toLowerCase()) !== -1 &&
            investidor.profile.nivel
              .toLowerCase()
              .indexOf(filterProfile.toLowerCase()) !== -1 &&
            investidor.endereco.estado
              .toLowerCase()
              .indexOf(filterEstados.toLowerCase()) !== -1
        )
      )
    );
  }

  ngOnInit(): void {
    this.profileService
      .getProfiles()
      .subscribe((dados) => (this.perfis = dados));
  }

  selectLocation(evento: any) {
    console.log(evento);
  }

  openCaracteristicas(id:number){
    this.router.navigate(['detail', id], { relativeTo: this.route } )
    console.log('open')
  }

  showAum(num: number) {
    let valorMon =num.toString()
    valorMon = num.toLocaleString('pt-br', { style: 'currency', currency:'BRL'});
    console.log(valorMon)
    //valorMon = num.toString().indexOf('.');
    let qtdcasas = valorMon.toString().slice(3).length
    //console.log(qtdcasas)
    let tam = valorMon.toString().slice(3).split(',')
    console.log('i',tam)
    if(tam.length >= 2){
      valorMon = tam[1].toString().replace(tam[1],' Mi')
    }
    if(tam.length > 4){
      valorMon = tam[1].toString().replace(tam[1],' Bi')
    }

    console.log(tam.length);
    return  tam[0] + valorMon
  }
}
