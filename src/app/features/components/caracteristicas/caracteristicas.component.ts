import { Component, OnInit } from '@angular/core';
import { Investidores } from '../../models/tarefas';
import { ListagemService } from '../../services/listagem.service';


@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.scss']
})
export class CaracteristicasComponent implements OnInit {
investidores: Investidores[] =[]
  constructor(private investidor: ListagemService) { }

  ngOnInit(): void {
    // this.investidor.getInvestidor().subscribe((dados)=>{
    //   this.investidores = dados;
    // })
  }

}
