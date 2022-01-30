import { Injectable } from '@angular/core';
import { CanActivate, Router, Route } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth/auth.service';

import Swal from 'sweetalert2';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private _authService:AuthService,
                private router:Router) { }

    canActivate():boolean{
        var token = localStorage.getItem('token');
        if(!token){
          this.router.navigateByUrl('/auth');
          return false;
        }
        if(this._authService.isAuth()){
          return true;
        }
        else{
          Swal.fire({
            icon:'error',
            title:'Token',
            text: "Your token has expired"
          }).then((r)=>{
            this.router.navigateByUrl('/auth');
            return false;
          });
          return false;
        }
    }

    canLoad(route: Route, 
            segments: import("@angular/router").UrlSegment[]): boolean | 
                      import("@angular/router").UrlTree | 
                      import("rxjs").Observable<boolean | 
                      import("@angular/router").UrlTree> | Promise<boolean | 
                      import("@angular/router").UrlTree> {
              if(this._authService.isAuth()){
                return true;
              }
              else{
                Swal.fire({
                  icon:'error',
                  title:'Token',
                  text: "Your token has expired"
                }).then((r)=>{
                  this.router.navigateByUrl('/auth');
                  return false;
                });
                return false;
              }     
    }  
}