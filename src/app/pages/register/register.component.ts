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

    classicalSolo: number;
    bollywoodSolo: number;
    battleOfBands: number;
    westernSolo: number;
    powerOfInstruments: number;
    underground: number;
    starNight: number;
    afterHours: number;
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
      this.classicalSolo = 0;
      this.battleOfBands = 0;
      this.bollywoodSolo = 0;
      this.westernSolo = 0;
      this.powerOfInstruments = 0;
      this.underground = 0;
      this.starNight = 0;
      this.afterHours = 0;
    }
    
  async register(){
 
    const user = await this.authService.register(this.credentials.value, this.nmimsStudent, this.classicalSolo, this.bollywoodSolo, this.battleOfBands, this.westernSolo, this.powerOfInstruments, this.underground, this.starNight, this.afterHours);
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
