import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { collection, collectionData, docData, Firestore, setDoc, updateDoc} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Database, set, ref, update } from '@angular/fire/database';
import { getAuth } from 'firebase/auth';
import { doc, runTransaction, Transaction } from 'firebase/firestore';



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
  async register ({name,email,password}:any, nmimsStudent: number)
  {
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

  getTicket(){
    const ticketsData= doc(this.firestore, 'tickets/ReqTkt3000');
    return docData(ticketsData);
  }
  updateTicket(){
    const ticketsUpdate = doc(this.firestore, 'tickets/ReqTkt3000');
    // return updateDoc(ticketsUpdate, {tickets_left: ticketsLeft});
  }
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




