import { TabelaComponent } from './components/tabela/tabela.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemComponent } from './listagem/listagem.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterLocationsComponent } from './filter-locations/filter-locations.component';
import { CaracteristicasComponent } from './components/caracteristicas/caracteristicas.component';


@NgModule({
  declarations: [ListagemComponent, FilterLocationsComponent, TabelaComponent, CaracteristicasComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [ListagemComponent, TabelaComponent, CaracteristicasComponent]
})
export class TarefasModule {}
