import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { stringify } from 'querystring';

interface User {
  email?: string;
  password?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  user: User = {
    email: "testingfromauth@gmail.com", 
    password: "testing"
  }

  constructor(private router: Router, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async login() {

    const user = await this.afAuth.auth.signInWithEmailAndPassword(
      this.user.email, 
      this.user.password
    )

    this.router.navigateByUrl('/tabs');
  }

  async signup() {
    this.router.navigateByUrl('/signup');

    // const user = await this.afAuth.auth.createUserWithEmailAndPassword(
    //   this.user.email,
    //   this.user.password
    // );

    // console.log(user);
  }
}