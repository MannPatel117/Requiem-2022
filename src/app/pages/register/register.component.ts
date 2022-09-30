import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  credentials: FormGroup;
  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router) 
    { }

    
    get name(){
      return this.credentials.get('name');
    }
    get email(){
      return this.credentials.get('email');
    }
  
    get password(){
      return this.credentials.get('password');
    }
    nmimsStudent=1;
    ngOnInit() {
      this.nmimsSelected();
    }
    
  async register(){
 
    const user = await this.authService.register(this.credentials.value, this.nmimsStudent); 
    if(user)
    {
      this.router.navigateByUrl('/verify-email', {replaceUrl: true});
    }
    else
    {
      console.log("Error"); 
    }
  }
  nmimsSelected(){
    this.nmimsStudent=1;
    this.credentials = this.fb.group({
      name: ['',[Validators.required, Validators.nullValidator]],
      email: ['',[Validators.required, Validators.email,this.emailDomain]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  nonNmimsSelected(){
    this.nmimsStudent=0;
    this.credentials = this.fb.group({
      name: ['',[Validators.required, Validators.nullValidator]],
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  routeToMain(){
    this.router.navigateByUrl('/main');
  }
  routeToLogin(){
    this.router.navigateByUrl('/login');
  }
 
  emailDomain(control: AbstractControl): {[key: string]:any}| null {
    const email: string=control.value;
    const domain = email.substring(email.lastIndexOf('@')+1);
    if(domain.toLowerCase() === 'nmims.edu.in')
    {
      return null;
    }
    else 
    {
      return { 'emailDomain': true};
    }
  }
}
