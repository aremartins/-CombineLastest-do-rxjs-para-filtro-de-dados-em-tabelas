import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemComponent } from './listagem/listagem.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterLocationsComponent } from './filter-locations/filter-locations.component';
import { CaracteristicasComponent } from './components/caracteristicas/caracteristicas.component';

@NgModule({
  declarations: [
    ListagemComponent,
    FilterLocationsComponent,
    CaracteristicasComponent,
  ],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [ListagemComponent, CaracteristicasComponent],
})
export class TarefasModule {}
