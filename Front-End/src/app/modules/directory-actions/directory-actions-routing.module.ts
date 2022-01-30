import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectoryActionsPageComponent } from './pages/directory-actions-page.component';

const routes: Routes = [
  {
    path: '',//TODO: localhost/show-case **
    component: DirectoryActionsPageComponent,
    data: { title: 'Directory actions', icon:'' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DirectoryActionsRoutingModule { }