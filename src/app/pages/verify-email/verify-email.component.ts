import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private fb: FormBuilder, 
    private auth: Auth,
    private rf: ReactiveFormsModule,
    private authService: AuthService,
    private router: Router) 
    { }

  ngOnInit(): void {
  }
  
  sendVerificationEmail(){
    const user= this.auth.currentUser;
    this.authService.sendEmailForVerification(user);
    this.router.navigateByUrl('/verification-email-sent', {replaceUrl: true});
  }
  routeToMain(){
    this.router.navigateByUrl('/main');
  }
  routeToHome(){
    this.router.navigateByUrl('/home');
  }
}
