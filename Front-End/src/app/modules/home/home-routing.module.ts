import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: 'directory',
    canActivate: [ AuthGuard ],
    canLoad: [ AuthGuard ],
    loadChildren: () => import('../directory/directory.module').then((m) => m.DirectoryModule)
  }, 
  {
    path: 'directory-actions',
    canActivate: [ AuthGuard ],
    canLoad: [ AuthGuard ],
    loadChildren: () => import('../directory-actions/directory-actions.module').then((m) => m.DirectoryActionsModule)
  },  
  {
    path:'',
    canActivate: [ AuthGuard ],
    canLoad: [ AuthGuard ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
