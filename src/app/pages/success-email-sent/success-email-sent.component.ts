import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-success-email-sent',
  templateUrl: './success-email-sent.component.html',
  styleUrls: ['./success-email-sent.component.css']
})
export class SuccessEmailSentComponent implements OnInit {

  constructor(private fb: FormBuilder, 
    private rf: ReactiveFormsModule,
    private authService: AuthService,
    private router: Router) 
    { }

  ngOnInit(): void {
  }
  routeToLogin(){
    this.router.navigateByUrl('/login');
  }
  routeToMain(){
    this.router.navigateByUrl('/main');
  }
}
