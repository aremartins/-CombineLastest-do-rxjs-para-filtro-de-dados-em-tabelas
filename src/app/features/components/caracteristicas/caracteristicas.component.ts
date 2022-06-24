import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Investidores } from '../../models/tarefas';
import { ListagemService } from '../../services/listagem.service';

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.scss'],
})
export class CaracteristicasComponent implements OnInit {
  investors: Investidores[] = [];
  formulario: FormGroup;

  constructor(private investidor: ListagemService, private http: HttpClient, private route: ActivatedRoute) {
    this.formulario = new FormGroup({
      perfil: new FormControl(''),
      aum: new FormControl('', Validators.min(0)),
      estados: new FormControl(''),
      nome: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.investidor.getInvestidor().subscribe((dados) => {
      this.investors = dados;
    });
    this.route.params.subscribe(
      (params:any) => {
        const id = params['id'];
        const investor$ = this.investidor.getById(id);
        investor$.subscribe(investidor => {
          this.updateForm(investidor)
        })
      }
    )
  }

  updateForm(investidor:any) {
    this.formulario.patchValue({
      perfil: investidor.profile.nivel,
      aum: investidor.aum
    })
  }

  onSubmit() {
    console.log(this.formulario.value);
    this.investidor.postInvestor(this.formulario.value);
    this.http
      .post(
        'http://localhost:3000/investors',
        JSON.stringify(this.formulario.value)
      )
      .subscribe(dados => {
        console.log(dados)
        this.formulario.reset();
      },
      (error:any) => alert(error + 'erro de url')
      );
  }

  Cancelar(){
    this.formulario.reset()
  }
}
