import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verification-email-sent',
  templateUrl: './verification-email-sent.component.html',
  styleUrls: ['./verification-email-sent.component.css']
})
export class VerificationEmailSentComponent implements OnInit {

  constructor(private fb: FormBuilder, 
    private rf: ReactiveFormsModule,
    private authService: AuthService,
    private router: Router) 
    { }

  ngOnInit(): void {
  }
  routeToHome(){
    this.router.navigateByUrl('/home');
  }
  routeToMain(){
    this.router.navigateByUrl('/main');
  }

}
