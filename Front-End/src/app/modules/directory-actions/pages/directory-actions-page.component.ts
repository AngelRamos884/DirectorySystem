import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DirectoryService } from '@modules/directory/services/directory.service';
import { HelpService } from '@modules/util/help.service';
import { Store } from '@ngrx/store';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { AppState } from '../../../state/app.state';
import Swal from 'sweetalert2';
import { selectListDirectory } from '../../../state/selectors/serials.selectors';
import { loadDirectory } from '../../../state/actions/directory.actions';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-directory-actions-page',
    templateUrl: './directory-actions-page.component.html',
})
export class DirectoryActionsPageComponent implements OnInit {

    public contactForm:FormGroup;
    public isUpdate:boolean = false;
    public telephoneNumbers:any[] = [];
    private valueNumber:string = "";

    public dtElement: DataTableDirective;
    public dtOptions: any = {};
    public dtTrigger: Subject<any> = new Subject();

    directory$:Observable<any> = new Observable();

    @ViewChild('name') addTelephone: ElementRef;

    constructor( private fb: FormBuilder, 
                 private _helpService:HelpService,
                 private _directoryService:DirectoryService,
                 private store: Store<AppState>) { }

    ngOnInit(): void {         
        this.store.dispatch(loadDirectory());
        this.setFormBuildArea();
        this.dtOptions = this._helpService.optionsDT('yes');
        this.directory$ =  this.store.select(selectListDirectory);
        this.directory$.subscribe(() => {
            $('#datatable').DataTable().clear().destroy();
            this.dtTrigger.next();       
        })
    }

    setFormBuildArea(){
        this.contactForm = this.fb.group({
            id:[0],
            firstName: [ '' , [ Validators.required ] ],
            lastName: [ '' , [ Validators.required ] ]            
        });
    }

    save(){
        
        if(this.contactForm.invalid){
            this._helpService.validateAllFormFields(this.contactForm);
            return;
        }else{
            Swal.fire({
                allowOutsideClick:false,
                icon:'info',
                text:'Loading...'
            });
            Swal.showLoading();
            if(this.telephoneNumbers.length <= 0){
                Swal.close();
                Swal.fire({
                    title:"Validation",
                    text:"Enter a number phone to save data",
                    icon:"info"
                  });
                  return;
            }
            let data = this.contactForm.getRawValue();
            data['telephoneNumbers'] = this.telephoneNumbers;
            
            this._directoryService
                    .postPatch('saveDirectory',data)
                        .subscribe((resp:any)=>{
                            Swal.fire({
                                title:resp.isSuccess,
                                text:resp.message,
                                icon:"success"
                              }).then((r) => {
                                Swal.close();
                                this.contactForm.reset();
                                this.telephoneNumbers  = [];
                                this.store.dispatch(loadDirectory());
                              });
                        });
        }
    }

    addTel(ev:any){
        let data = [...this.telephoneNumbers];   
        if(this.valueNumber !== ""){
            if(this.valueNumber.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)){
                data.push({
                    telephoneNumber:this.valueNumber
                })
                this.telephoneNumbers = data;       
                this.valueNumber = "";
                this.addTelephone.nativeElement.value = ""
            }
        }else{
            Swal.fire({
                title:"Validation",
                text:"Type a valid phone number",
                icon:"info"
              });
        }
    }
    typing(value:any){
        let term = value.value;
        if(term.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)){
            this.valueNumber = term;
            return;
        }        
    }

    renderValues(data:any[], primaryKey:any){
        
        var stringRender = '';
        if(data !== null){
         
            data.forEach((data:any, idx:number) => {
                let stringData = ""
                        stringData = `<span>number</span>: <h6>${data.telephoneNumber}</h6>`;
                        stringRender = stringRender + stringData;            
            })
            return stringRender;
        }
        return "";
    }    

    updateContact(item:any){
        this.contactForm.patchValue(item);
        this.telephoneNumbers = item.telephoneNumbers;
        this.isUpdate = true;
        
    }

    deleteContact(item:any){
        Swal.fire({
            allowOutsideClick:false,
            icon:'info',
            text:'Loading...'
        });
        Swal.showLoading();
        this._directoryService
                    .postPatch('deleteDirectory',item)
                        .subscribe((resp:any)=>{
                            Swal.fire({
                                title:resp.isSuccess,
                                text:resp.message,
                                icon:"success"
                              }).then((r) => {
                                Swal.close();
                                this.contactForm.reset();
                                this.telephoneNumbers  = [];
                                this.store.dispatch(loadDirectory());
                              });
                        });
    }

    deleteTelephoneNumber(item:any, idx:number){

        let data = [...this.telephoneNumbers];

        if(this.isUpdate){
           
            data.splice(idx, 1);     
            this.telephoneNumbers = data;
            Swal.fire({
                allowOutsideClick:false,
                icon:'info',
                text:'Loading...'
            });
            Swal.showLoading();
            this._directoryService
                        .postPatch('deleteTelephoneNumber',item)
                            .subscribe((resp:any)=>{
                                Swal.fire({
                                    title:resp.isSuccess,
                                    text:resp.message,
                                    icon:"success"
                                  }).then((r) => {
                                    Swal.close();
                                    this.contactForm.reset();
                                    this.telephoneNumbers  = [];
                                    this.store.dispatch(loadDirectory());
                                  });
                            });
            return;
                   
        }else{
            data.splice(idx, 1);       
            this.telephoneNumbers = data;     
            return;
        }
    }

    updateTelephoneNumber(item:any){
        let $this = this;
        Swal.fire({
            title: 'Update telephone',
            html: `<input type="text" id="telephone" class="swal2-input" value='${item.telephoneNumber}' placeholder="Username">`,
            confirmButtonText: 'update number',
            showCloseButton: true,
            focusConfirm: false,
            allowEscapeKey : false,
            allowOutsideClick: false,
            preConfirm: () => {
              const telephone:any = Swal.getPopup().querySelector('#telephone');
              const t = telephone.value;

              if (!t.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
                Swal.showValidationMessage(`Please enter valid telephone number`);
              }              
              return { telephoneNumber: t}
            }
          }).then(async (result:any) => {
            result.value['id'] = item.id;
            if(result.isConfirmed){
                Swal.fire({
                    allowOutsideClick:false,
                    icon:'info',
                    text:'Loading...'
                });
                Swal.showLoading();
                let response = await $this._directoryService
                                       .postPatch("updateTelephoneNumber",result.value)
                                       .toPromise()
                                       .then(r => r);
                                       Swal.fire({
                                                title:response.isSuccess,
                                                text:response.message,
                                                icon:"success"
                                            }).then((r) => {
                                                Swal.close();
                                                this.contactForm.reset();
                                                this.telephoneNumbers  = [];
                                                this.store.dispatch(loadDirectory());
                                            });
                if(response !== null || undefined){

                }
            }
          })
    }

    ngOnDestroy(){
        this.directory$.subscribe().unsubscribe();
    }
}
