import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { docData, Firestore, setDoc, updateDoc} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Database, set, ref, update, provideDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { doc, runTransaction, collection, addDoc, Transaction } from 'firebase/firestore';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, 
    private database: Database,
    private firestore: Firestore, 
    private router: Router)
  {

  }
  ngOnInit(){
    console.log(this.database.app)
  }
  async register ({name,email,password}:any, nmimsStudent: number, classicalSolo: number, bollywoodSolo: number, battleOfBands: number, westernSolo: number, powerOfInstruments: number, underground: number, starNight: number, afterHours: number)  {
    try{
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
      );
      
      const uid=user.user.uid;
      set(ref(this.database, 'users/' + uid),{
        name: name,
        email: email,
        isNmims: nmimsStudent,
        classicalSolo: classicalSolo,
        bollywoodSolo: bollywoodSolo,
        battleOfBands: battleOfBands,
        westernSolo: westernSolo,
        powerOfInstruments: powerOfInstruments,
        underground: underground,
        starNight: starNight,
        afterHours: afterHours

      });
      this.router.navigateByUrl('/verify-email', {replaceUrl: true});
      return user;

    }
    catch(e)
    {
      return null;
    }
  }

  async login ({email,password}:any)
  {
    try{
      const user = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      
      return user;
    }
    catch(e)
    {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }

  forgotPassword({email}:any)
  {
    sendPasswordResetEmail(this.auth, email).then(()=> {
      this.router.navigateByUrl('/success-email-sent', {replaceUrl: true});
    },err => {
      alert("Something went wrong, Try again");
    });
  }

  sendEmailForVerification(user : any){
    sendEmailVerification(user).then((res:any)=>
    {
      this.router.navigateByUrl('/verification-email-sent', {replaceUrl: true});
    },(err:any) =>{
      alert(err.message);
    });
  } 


  // StarNight1 Ticket Update
  async ticketUpdateFinal(){
    const ticketsData= doc(this.firestore, 'tickets/ReqTkt3000');
    try{
      await runTransaction(this.firestore, async (Transaction)=>
      {
        const ReqTkt3000Doc = await Transaction.get(ticketsData);
        if(!ReqTkt3000Doc.exists())
        {
          throw alert("ERROR");
        }  
        const tickets_leftUpdate = ReqTkt3000Doc.data()['tickets_left'] - 1;
        Transaction.update(ticketsData, {tickets_left:tickets_leftUpdate});
      });
      console.log('Successfull');
    } 
    catch(e)
    {
      console.log("Transaction Failed : ", e);
    }
  }
}




