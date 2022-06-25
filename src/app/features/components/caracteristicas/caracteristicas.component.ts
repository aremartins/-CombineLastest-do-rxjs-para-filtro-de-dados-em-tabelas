import { Profile } from './../../models/tarefas';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Investidores } from '../../models/tarefas';
import { ListagemService } from '../../services/listagem.service';
import { ProfilesService } from '../../services/profiles.service';
import { Estados } from '../../models/estados';
import { EstadosService } from '../../services/estados.service';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.scss'],
})
export class CaracteristicasComponent implements OnInit {
  investors: Investidores[] = [];
  formulario: FormGroup;
  perfis: Profile[] = [];
  estados: Estados[] = [];

  constructor(
    private investidorService: ListagemService,
    private http: HttpClient,
    private profileService: ProfilesService,
    private estadosService: EstadosService,
    private route: ActivatedRoute
  ) {
    this.formulario = new FormGroup({
      perfil: new FormControl(''),
      nome: new FormControl(''),
      aum: new FormControl(''),
      estados: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.investidorService.getInvestidor().subscribe((dados) => {
      //foi preciso buscar os investidores na service para popular as opções dos selects
      this.investors = dados;
    });
    this.profileService
      .getProfiles()
      .subscribe((dados) => (this.perfis = dados));
    this.estadosService
      .getEstados()
      .subscribe((dados) => (this.estados = dados));
    // this.route.params.subscribe((params: any) => {
    //   //pega o parametro de id da rota, busca o investidor por id na service e atribui  o id da rota
    //   const id = params['id'];
    //   const investor$ = this.investidorService.getById(id);
    //   investor$.subscribe((investor) => {
    //     this.updateForm(investor); //atualiza o formulario com os dados desse investidor
    //   });
    // });

    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap((id) => this.investidorService.getById(id))
      )
      .subscribe((investidor) => this.updateForm(investidor));
  }

  updateForm(investidor: Investidores) {
    this.formulario.patchValue({
      nome: investidor.nome,
      aum: investidor.aum,
      perfil: investidor.profile?.nivel,
      estados: investidor.endereco?.estado,
    });
    // const investor = this.route.snapshot.data['investor']
    // this.formulario = new FormGroup({
    //   perfil: new FormControl(investor.perfil.nivel),
    //   nome: new FormControl(investor.nome),
    //   aum: new FormControl(investor.aum),
    //   estados: new FormControl(investor.endereco.estado),
    // });
  }

  onSubmit() {
    // console.log(this.formulario.value);
    // this.investidor.postInvestor(this.formulario.value);
    // this.http
    //   .post(
    //     'http://localhost:3000/investors',
    //     JSON.stringify(this.formulario.value)
    //   )
    //   .subscribe(
    //     (dados) => {
    //       console.log(dados);
    //       this.formulario.reset();
    //     },
    //     (error: any) => alert(error + 'erro de url')
    //   );
  }

  Cancelar() {
    this.formulario.reset();
  }
}
