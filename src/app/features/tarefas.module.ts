import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemComponent } from './listagem/listagem.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterLocationsComponent } from './filter-locations/filter-locations.component';


@NgModule({
  declarations: [ListagemComponent, FilterLocationsComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [ListagemComponent]
})
export class TarefasModule {}
