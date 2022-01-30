import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class MenuService {
    public menu:any = {

    };
    public displayName:string = "";
    public email:string = "";
    public username:string = "";
    public roles:any;
    public rolesArray:any[] = [];
    constructor() { 
        this.getMenuFromLocalStorage();
    }

    getMenuFromLocalStorage(){
        this.displayName = localStorage.getItem('displayName');
        this.email = localStorage.getItem('email');
        this.username = localStorage.getItem('username');
        this.rolesArray = JSON.parse(localStorage.getItem('roles'));
        this.getRoles();
    }
    getRoles(){
        let rol = "";
        this.rolesArray.map((resp:any) => {
            rol = rol + " " +resp.roleName
        });
        this.roles = rol;
    }
    clear(){
        this.menu = [];
        this.displayName = null;
        this.email = null;
        this.username = null;
        this.roles = null;
    }
}