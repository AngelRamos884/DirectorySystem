import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectoryInfoComponent } from './components/directory-info/directory-info.component';
import { DirectoryPageComponent } from './pages/directory-page.component';

const routes: Routes = [
  {
    path: '',//TODO: localhost/show-case **
    component: DirectoryPageComponent,
    data: { title: 'Directory', icon:'' }
  },
  {
    path: 'info',//TODO: localhost/show-case **
    component: DirectoryInfoComponent,
    data: { title: 'Directory info', icon:'' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DirectoryRoutingModule { }
