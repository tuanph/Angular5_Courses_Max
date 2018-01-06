import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyD3nGEWED8Sm4fdY5ZErAVL34-ICZ02bwM',
      authDomain: 'recipebook-1adfd.firebaseapp.com'
    });
  }
}
