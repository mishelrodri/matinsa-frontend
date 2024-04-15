import { Routes } from '@angular/router';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { OrdenesModule } from './modules/ordenes/ordenes.module';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path:'',
    component:SkeletonComponent,
    children:[
      {
        path: 'inicio',
        loadChildren: () => import('@home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'ordenes',
        loadChildren: () => import('@ordenes/ordenes.module').then(m => m.OrdenesModule)
      },
      {
        path: 'linea-produccion',
        loadChildren: () => import('@linea-produccion/linea-produccion.module').then(m => m.LineaProduccionModule)
      },
    ]
  }
];
