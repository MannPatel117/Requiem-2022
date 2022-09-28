import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { docData, Firestore, setDoc} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore, private router: Router)
  {

  }
  async register ({name,email,password}:any)
  {
    try{
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
      );
      // const uid=user.user.uid;
      // const userDocRef = doc(this.firestore, `users/${uid}`);
      // setDoc(userDocRef, { name });
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
      this.router.navigateByUrl('/success-email-sent');
    },err => {
      alert("Something went wrong, Try again");
    });
  }


  getUserById(id: string){
    const userDocRef = doc(this.firestore, `users/${id}`);
    return docData(userDocRef, {idField: 'id'} );
  }
  
  
}
