import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { docData, Firestore, setDoc} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Database, set, ref, update } from '@angular/fire/database';
import { getAuth } from 'firebase/auth';
import { doc } from 'firebase/firestore';

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
      this.router.navigateByUrl('/success-email-sent', {replaceUrl: true});
    },(err:any) =>{
      alert(err.message);
    });
  } 

  getUserById(id: string){
    const userDocRef = doc(this.firestore, `users/${id}`);
    return docData(userDocRef, {idField: 'id'} );
  }
  
  
}
