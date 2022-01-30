import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { DirectoryActionsPageComponent } from './pages/directory-actions-page.component';
import { DirectoryActionsRoutingModule } from './directory-actions-routing.module';

@NgModule({
    declarations: [
        DirectoryActionsPageComponent
    ],
    imports: [ 
        CommonModule,
        DataTablesModule,
        DirectoryActionsRoutingModule
    ],
    exports: [],
    providers: [],
})
export class DirectoryActionsModule {}