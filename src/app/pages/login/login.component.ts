import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: FormGroup;
  constructor(private fb: FormBuilder, 
    private rf: ReactiveFormsModule,
    private authService: AuthService,
    private router: Router) 
    { }

  get email(){
    return this.credentials.get('email');
  }
  get password(){
    return this.credentials.get('password');
  }
  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  async login(){

  const user = await this.authService.login(this.credentials.value);


    if(user)
    {
      this.router.navigateByUrl('/home', {replaceUrl: true});
    }
    else
    {
      console.log('Login Failed', 'Please Try Again!');
    }
  }
  routeToMain(){
    this.router.navigateByUrl('/main');
  }
  routeToRegister(){
    this.router.navigateByUrl('/register');
  }
  routeToForgotPassword(){
    this.router.navigateByUrl('/forgot-password');
  }
}
