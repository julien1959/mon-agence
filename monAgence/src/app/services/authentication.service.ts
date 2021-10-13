import {Injectable} from '@angular/core';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() {
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            resolve(userCredential.user);
          }
        ).catch(
          (error) => {
            reject(error);
          }
        )
      }
    );
  }

  signOutUser() {
    const auth = getAuth();
    signOut(auth);
  }


  /* signUpUser(email: string, password: string){
    return new Promise (
      (resolve, reject) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            console.log('Connecté');
            resolve(userCredential.user);
          }
        ).catch(
          (error) => {
            reject(error);
          }
        )
      }
    );
  } */
}
