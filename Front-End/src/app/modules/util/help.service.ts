import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { interval, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';

@Injectable({providedIn: 'root'})
export class HelpService {
    private headers: any;
    public dtOptions: any = {};
    public dtTrigger: Subject<any> = new Subject();

    constructor() { 
    }
    getNameToken(name:any){
        let token:any = localStorage.getItem('token');
        let payload = JSON.parse( atob( token.split('.')[1] ) );
        const values = Object.keys(payload).map(key => payload[key]);
        switch (name) {
            case 'username':
                  return values[0];
            case 'rol':
                  return values[1];
            default:
                return null;
        }
    }
    parserDateTo24(date:any){ // Checar hora 
        let myMoment: moment.Moment = moment(date);
        return myMoment.format('HH:mm')
    }
    getFromLocalStorage(key:string){
        return localStorage.getItem(key);
    }
    getTokenWithHeaders(){
        const auth_token = localStorage.getItem('token');
        
        var headersObj = {};
        this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth_token
        });
        return headersObj = {
            headers:this.headers
        }
    }
    getTokenWithHeadersFormMult(){
        const auth_token = localStorage.getItem('token');
        return this.headers = new HttpHeaders({
        'Authorization': 'Bearer ' + auth_token
        })
    }

    trimParser(object:any):any{
        Object.keys(object).map(k => object[k] = typeof object[k] == 'string' ? object[k].trim() : object[k]);
        return object;
    }

    public serverError(error:HttpErrorResponse){
        let errorMsg:string = "";
        if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;                    
        } else {
            this.getServerErrorMessage(error);                                     
        }
        return errorMsg;
    }

    private getServerErrorMessage(error: HttpErrorResponse) {
        Swal.close();
        switch (error.status) {
            case 400: {
                Swal.fire({
                    title:"Validation",
                    text:error.error,
                    icon:"warning"
                  });   
                  console.log(error)
                  return;
            }
            case 401: {
                Swal.fire({
                    title:"Unauthorized",
                    text:"You don't have access",
                    icon:"error"
                  }); 
                return ;
            }
            case 404: {
                Swal.fire({
                    title:"Not found",
                    text:error.error,
                    icon:"info"
                  });   
                  return;
            }
            case 403: {
                Swal.fire({
                    title:"Access Denied",
                    text:'error: ' + error.message,
                    icon:"error"
                  }); 
                return ;
            }
            case 500: {
                Swal.fire({
                    title:"Internal Server Error",
                    text: error.error,
                    icon:"error"
                  }); 
                return;
            }
            default: {
                Swal.fire({
                    title:"Unknown Server Errorr",
                    text: 'Unknown Server Error: ' + error.message,
                    icon:"error"
                  }); 
                return;
            }

        }
    }

    optionsDT(opt:string):any{
        var optBtn = [{
                "extend":"excel",
                "text":'Excel',
                "className":"btn btn-success ml-2"
            },
            {
                "extend":"print",
                "text":'Print',
                "className":"btn btn-dark ml-2"
            }];
            
        if(opt == 'yes'){
            return this.dtOptions = {
                destroy:true,
                pagingType: 'full_numbers',
                pageLength: 10,
                processing: true,
                dom: 'lBfrtip',
                buttons: optBtn,
                "ordering":false
              };
        }
        else{
            optBtn = [];
            return this.dtOptions = {
                destroy:true,
                pagingType: 'full_numbers',
                pageLength: 5,
                processing: true,
                dom: 'lBfrtip',
                buttons:optBtn,
                "ordering":false,
                language: LanguageApp.spanish_datatables
              };
        }
        
      }
    
    destroyDatatable(dtName:string){
        // $(`#${dtName}`).DataTable().clear().destroy();
    }

    loadSitesByRolSaved(){
        // return JSON.parse(localStorage.getItem("rolesBySite"));
    }


    swalLoad(){
        Swal.fire({
            allowOutsideClick:false,
            icon:'info',
            text:'Loading...'
        });
        Swal.showLoading();
    }

    swalClose(){
        Swal.close();
    }

    restartTime(){
        return interval(1000).pipe(
            map(() => {
                return new Date();
            })
        )              
    }
        
    validateAllFormFields(formGroup: FormGroup) {         
        Object.keys(formGroup.controls).forEach(field => {  
          const control = formGroup.get(field);             
          if (control instanceof FormControl) {             
            control.markAsTouched({ onlySelf: true });
          } else if (control instanceof FormGroup) {        
            this.validateAllFormFields(control);            
          }
        });
    }

    getObjectFromLocalStorage(item:string){
        return JSON.parse(
            localStorage.getItem(item)
        )
    }

    public noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    }

    calculateTimeClosed(dateStart:Date, dateClosed:Date){
        var differenceTime = new Date(dateClosed).getTime() - new Date(dateStart).getTime();
        var differenceDays = differenceTime / (1000 * 3600 * 24);
        
        if(differenceDays > 0){
            return differenceDays.toString().split('.')[0];
        }else{
            return 0;
        }
    }

    isAdminToDisabled(){
        let roles = this.getObjectFromLocalStorage('roles');
        let isAdmin = roles.find((item:any) => item.name === 'admin');
        if(isAdmin){
            return true;
        }else{
            return false;
        }
    }  
    getValueFormByKey(key:string, formBuilder:FormGroup){
          return formBuilder.get(key).value;
    }
  
    setValueFormByKeyAndValue(key:string, value:string, formBuilder:any){
        formBuilder.get(key).setValue(value);
    }

    convertToEvents(data:any[]):any[]{
        
        let newArray = [];
  
        data.forEach((element:any, index:number) => {
          newArray.push({
            date:formatDate(element.startDate, 'yyyy-MM-dd', 'en'),
            title:element.auditTemplate.name,
            color:element.auditTemplate.auditType.color,
            extendedProps:{
              auditScheduleId:element.id,
              auditTemplateId:element.auditTemplate.id,
              index
            }
          });
        });
  
        return newArray;
      }
}

class LanguageApp {
    public static spanish_datatables = {
      processing: "Procesando...",
      search: "Buscar:",
      lengthMenu: "Mostrar _MENU_ &elementos",
      info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
      infoEmpty: "Mostrando ningún elemento.",
      infoFiltered: "(filtrado _MAX_ elementos total)",
      infoPostFix: "",
      loadingRecords: "Cargando registros...",
      zeroRecords: "No se encontraron registros",
      emptyTable: "No hay datos disponibles en la tabla",
      paginate: {
        first: "Primero",
        previous: "Anterior",
        next: "Siguiente",
        last: "Último"
      },
      aria: {
        sortAscending: ": Activar para ordenar la tabla en orden ascendente",
        sortDescending: ": Activar para ordenar la tabla en orden descendente"
      }
    }
  }