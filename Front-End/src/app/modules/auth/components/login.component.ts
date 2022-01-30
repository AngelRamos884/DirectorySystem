import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

    public loginForm:FormGroup;
    
    public sites:any[] = [];
    public activeDirectoryGroupName:number = 0;
    public loading:boolean = false;

    constructor(private router: Router,
                private fb: FormBuilder,
                private _authService: AuthService,
                ) { 
            

    }
  
    ngOnInit(): void {
        this.loginForm = this.fb.group({
            username: [ '' , [ Validators.required ] ],
            password: ['', Validators.required ]
        });
    }
    
    login(){
       if(this.loginForm.invalid){
        //    this._helpService.validateAllFormFields(this.loginForm);
           return;
       }else{
        Swal.fire({
            allowOutsideClick:false,
            icon:'info',
            text:'Loading...'
        });
        Swal.showLoading();
        let login = this.loginForm.getRawValue();
        this._authService.login(login)
            .subscribe((resp:any) => {                                
                    this.router.navigate(['/find-serials']);             
            });
        
       }
    }


  
}