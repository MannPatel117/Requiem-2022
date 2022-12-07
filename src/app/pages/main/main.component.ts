import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isMenuOpen = false;
  constructor( 
    private authService: AuthService,
    private router: Router) 
    { }

  ngOnInit(): void {
  }
  goToRegister(){
    this.router.navigateByUrl('/register');
  }
  routeToMain(){
    this.router.navigateByUrl('/main');
  }
  toggleMenu(): void{
    this.isMenuOpen = !this.isMenuOpen;
  }
}
