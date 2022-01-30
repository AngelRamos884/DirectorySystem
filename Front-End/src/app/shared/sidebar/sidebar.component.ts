import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu/menu.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html'
})

export class SideBarComponent implements OnInit {
    constructor(public _menuService:MenuService) {
    }

    ngOnInit() { 
        this._menuService.getMenuFromLocalStorage();
    }
}