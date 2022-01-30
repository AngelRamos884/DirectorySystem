import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../environments/environment.prod';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

const base_url = environment.backend.baseURL;

@Injectable({providedIn: 'root'})
export class AuthService {
    private controllerPath = 'Auth';
    public token:string;
    public timeExp:string

    constructor(private http: HttpClient) { 
      this.readToken(); 
    }
    
    login(login: any ){
        let path = "/login";
        return this.http.post(
            base_url + this.controllerPath + path,
            login
        ).pipe(
            map( (resp:any) => {
                
                this.timeExp = String(resp.expTime);
                this.setItemToLocalStorage(resp.displayName, "displayName");
                this.setItemToLocalStorage(resp.email, "email");
                this.setItemToLocalStorage(JSON.stringify(resp.menu), "menu");
                this.setItemToLocalStorage(JSON.stringify(resp.roles), "roles");
                this.setItemToLocalStorage(resp.username, "username");
                this.setItemToLocalStorage(JSON.stringify(resp.site), "site");
                this.saveToken(resp.token);
                Swal.close();
                return resp;
            }),
            catchError(err => {
              Swal.fire({
                icon:'error',
                title:'Sign in error',
                text: err.error
              });
              throw err;
            })
        )
    }

    loginForSetFinding(login: any ){
      let path = "/loginForSetFinding";
      return this.http.post(
          base_url + this.controllerPath + path,
          login
      ).pipe(
          map( (resp:any) => {       
            return resp;       
          }),
          catchError(err => {
            Swal.fire({
              icon:'error',
              title:'Sign in error',
              text: err.error
            });
            throw err;
          })
      )
  }
    
    setItemToLocalStorage(value:any, name:any):any{
        localStorage.setItem(name, value);
        return value;
    }

    /* This method is for save token and set expired date to validate that the life of token will be valid */
    private saveToken(token:string){
        this.token = token;
        var oldDateObj = new Date();
        var newDateObj = new Date();
        newDateObj.setTime(oldDateObj.getTime() + (Number(this.timeExp) * 60 * 1000));
        localStorage.setItem('expired', newDateObj.getTime().toString() );
        localStorage.setItem('token', token);
    }

    /* Method for read token from localstorage and set into prop */
    readToken(){
        if(localStorage.getItem('token')){
          this.token = localStorage.getItem('token');
        } else{
         this.token = ''; 
        }
        return this.token;
      }
      /* Check if date is not expired */
      isAuth():boolean{
        if(this.token.length < 2){
          return false;
        }
        const expired = Number(localStorage.getItem('expired'));
        const expiredDate = new Date();
        expiredDate.setTime(expired);
        const curentlyDate = new Date();
        if(expiredDate > curentlyDate){
          return true;
        }
        else{             
          return false;
        }
      
    }
  
    isGuard(){
        let siteRoles = JSON.parse(localStorage.getItem('rolesBySite'));
        let roles = JSON.parse(localStorage.getItem('roles'));
        let guardRole = false;
        roles.forEach(element => {
          if(element.roleName === "guard"){
              guardRole = true;
              return;
          }
        });
        return guardRole;
    }
}