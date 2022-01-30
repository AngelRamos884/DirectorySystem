import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../app/modules/home/components/home-page/home-page.component';

const routes: Routes = [
  {
    path: '', //TODO: Private!,
    component: HomePageComponent,
    loadChildren: () => import('../app/modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',//TODO: Public!
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: '/directory/info'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
