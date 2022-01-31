import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { DirectoryActionsPageComponent } from './pages/directory-actions-page.component';
import { DirectoryActionsRoutingModule } from './directory-actions-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        DirectoryActionsPageComponent
    ],
    imports: [ 
        CommonModule,
        DataTablesModule,
        DirectoryActionsRoutingModule,
        ReactiveFormsModule
    ],
    exports: [],
    providers: [],
})
export class DirectoryActionsModule {}