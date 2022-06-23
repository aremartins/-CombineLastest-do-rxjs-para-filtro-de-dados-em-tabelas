import { CaracteristicasComponent } from './features/components/caracteristicas/caracteristicas.component';
import { ListagemComponent } from './features/listagem/listagem.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ListagemComponent },
  { path: 'detail/:id', component: CaracteristicasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
