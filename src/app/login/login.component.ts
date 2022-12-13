import { Component, OnInit } from '@angular/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getRedirectResult,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
} from 'firebase/auth';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    private http: HttpClient
  ) {}
  linkedInCredentials = {
    clientId: "77ts72etc4g7cp",
    redirectUrl: "http://localhost:4200/",
    scope: "r_liteprofile%20r_emailaddress%20w_member_social" // To read basic user profile data and email
  };

  ngOnInit() {}

  loginFB = () => {
    return this.AuthLogin(new FacebookAuthProvider()).then(
      (res: any) => {
        console.log(res)
      }
    );
  };
  login() {
    window.location.href =`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${this.linkedInCredentials.clientId}&redirect_uri=${this.linkedInCredentials.redirectUrl}&state=foobar&scope=r_liteprofile%20r_emailaddress`;


  }
  loginGoggle = () => {
    return this.AuthLogin(new GoogleAuthProvider()).then((res: any) => {
      console.log(res)

    });
  };
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        // console.log(result.user?._delegate.accessToken)

        console.log(result

          )

        this.router.navigate(['dashboard']);
      })
      .catch((error) => {
        window.alert(error);
        this.router.navigate(['home']);
      });
  }
  loginMicrosoft = () => {
    return this.AuthLogin(new OAuthProvider('microsoft.com')).then(
      (res: any) => {}
    );
  };
}
