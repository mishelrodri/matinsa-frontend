import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LineaProduccionComponent } from './pages/linea-produccion/linea-produccion.component';

const routes: Routes = [
  {
    path:'',
    component:LineaProduccionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LineaProduccionRoutingModule { }
