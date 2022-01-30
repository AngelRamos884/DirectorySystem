import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryPageComponent } from './pages/directory-page.component';
import { DirectoryRoutingModule } from './directory-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { DirectoryInfoComponent } from './components/directory-info/directory-info.component';

@NgModule({
    declarations: [
        DirectoryPageComponent,
        DirectoryInfoComponent
    ],
    imports: [ 
        CommonModule,
        DirectoryRoutingModule,
        DataTablesModule
    ],
    exports: [],
    providers: [],
})
export class DirectoryModule {}