import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Database, ref } from '@angular/fire/database';
import { Router } from '@angular/router';
import { get, onValue } from 'firebase/database';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ticketsLeft:number;
  constructor( 
  private auth: Auth,
  private database: Database,
  private authService: AuthService,
  private router: Router) {
    
   }
  nmimsStudent:any;
  emailVerified:any;
  name:string;
  ngOnInit(): void {
    const uid=this.auth.currentUser?.uid;
    this.emailVerified=this.auth.currentUser?.emailVerified;
    console.log(uid);
    const startCountRef = ref(this.database, 'users/'+uid);
    onValue(startCountRef, (snapshot) =>
    {
      const data= snapshot.val();
      this.name=data.name;
      if(data.isNmims == 1)
      {
        this.nmimsStudent=true;
      }
      else
      {
        this.nmimsStudent=false;
      }
      console.log(this.nmimsStudent);
    });
    this.authService.getTicket().subscribe(res =>{
      this.ticketsLeft=res['tickets_left'];
    });
  }
  async logout()
  {
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl:true});
  }
  buyTicket(){
    this.authService.getTicket().subscribe(res =>{
      this.ticketsLeft=res['tickets_left']; 
    });
    this.updateTicket();
  }

  updateTicket(){
    this.authService.updateTicket(this.ticketsLeft-1);
  }
}
