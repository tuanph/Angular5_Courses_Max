import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {

  token: string;
  constructor(private router: Router) {

  }

  signUp(email: string, passwrod: string) {
    firebase.auth().createUserWithEmailAndPassword(email, passwrod)
      .catch((error: any) => { console.error });
  }

  signIn(email: string, passwrod: string) {
    firebase.auth().signInWithEmailAndPassword(email, passwrod)
      .then((response) => {
        firebase.auth().currentUser.getToken()
          .then((token: string) => {
            this.token = token;
            this.router.navigate(['/']);
          });
      })
      .catch((error: any) => { console.log(error) });
  }
  logOut() {
    firebase.auth().signOut();
    this.token = null;
  }
  getToken() {
    firebase.auth().currentUser.getToken()
      .then((token: string) => {
        this.token = token;
      });
    return this.token;
  }
  isAuthenticated() {
    return this.token != null;
  }
}
