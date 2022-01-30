import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { HelpService } from '../../util/help.service';
import Swal from 'sweetalert2';
const base_url = environment.backend.baseURL;

@Injectable({providedIn: 'root'})

export class DirectoryService {
    
    private controllerPath = 'Directory';

    constructor(private httpClient: HttpClient, private _helpService:HelpService) { }

    postPatch<T>(
        route:string,
        data:any        
    ):Observable<any>{
        return this.httpClient.post(
            base_url + this.controllerPath +'/'+ route,
            data,
            this.getTokenWithHeaders()
        )
        .pipe(
            map( (resp:any) => {
                this._helpService.swalClose();
                return resp;
            }),
            catchError(error => {
                let errorMsg: string;
                errorMsg = this._helpService.serverError(error);
                return throwError(errorMsg);
            })
        );
    }

    getAllById<T>(
        route:any,
        id:string = ""
     ):Observable<any[]>{         
         let url = `/${route}/${id}`;
         return this.httpClient.get(
             base_url + this.controllerPath + url,
             this.getTokenWithHeaders()
         )
         .pipe(
             map( (resp:any) => {
                 Swal.close();
                 return resp.result;
             }),
             catchError(error => {
                 let errorMsg: string;
                 errorMsg = this._helpService.serverError(error);
                 return throwError(errorMsg);
             })
         );
    }

    getTokenWithHeaders(){
        const auth_token = localStorage.getItem('token');
        let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth_token
        });
        return {
            headers:headers
        }
    }
    
    getTokenWithHeadersFormMult(){
        const auth_token = localStorage.getItem('token');
        let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + auth_token
        });
        return {
            headers:headers
        }
    }

}