import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemComponent } from './listagem/listagem.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListagemComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [ListagemComponent]
})
export class TarefasModule {}
