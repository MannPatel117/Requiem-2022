import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  credentials: FormGroup;
  constructor(private fb: FormBuilder, 
    private rf: ReactiveFormsModule,
    private authService: AuthService,
    private router: Router) 
    { }
    ngOnInit() {
      this.credentials = this.fb.group({
        email: ['',[Validators.required, Validators.email]]
      });
    }
  get email(){
    return this.credentials.get('email');
  }
  forgotPassword(){
    this.authService.forgotPassword(this.credentials.value);
  }
  routeToLogin(){
    this.router.navigateByUrl('/login');
  }
  routeToMain(){
    this.router.navigateByUrl('/main');
  }
}
