import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Estados } from '../models/estados';
import { EstadosService } from '../services/estados.service';

@Component({
  selector: 'app-filter-locations',
  templateUrl: './filter-locations.component.html',
  styleUrls: ['./filter-locations.component.scss']
})
export class FilterLocationsComponent implements OnInit {
 @Output() aoEscolher  = new EventEmitter()
 estados:Estados[] = []

 @Input() locations: FormControl

  constructor(private estadosService: EstadosService) {
    this.locations = new FormControl('')
    this.estadosService.getEstados().subscribe((estados)=>
      this.estados = estados
    )
   }

  ngOnInit(): void {
  }

  changeLocation(evento:any){
    this.aoEscolher.emit(evento)
  }

}
