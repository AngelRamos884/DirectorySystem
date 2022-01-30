import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NavBarComponent } from './navbar/navbar.component';
import { SideBarComponent } from './sidebar/sidebar.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule
    ],
    exports: [
        BreadcrumbsComponent,
        NavBarComponent,
        SideBarComponent
    ],
    declarations: [
        BreadcrumbsComponent,
        NavBarComponent,
        SideBarComponent
    ],
    providers: [],
})
export class SharedModule { }
