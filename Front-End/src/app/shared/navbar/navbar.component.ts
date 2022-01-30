import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu/menu.service';

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html'
})

export class NavBarComponent implements OnInit {
    
    constructor(public router:Router, public _menuService:MenuService) { }

    ngOnInit() { }

    logOut(){
        localStorage.clear();
        this.router.navigate(['/auth']);
    }
    
}