import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  constructor(private router: Router, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async login() {
    var email,
    element = (<HTMLInputElement>document.getElementById("email"));
    if (element.value != null) {
      email = element.value;
    }

    var pwd, 
    element = (<HTMLInputElement>document.getElementById("pwd"));
    if (element.value != null) {
      pwd = element.value;
    }

    const user = await this.afAuth.auth.signInWithEmailAndPassword(
      email, 
      pwd
    )

    this.router.navigateByUrl('/tabs');
  }

  async signup() {
    var email,
    element = (<HTMLInputElement>document.getElementById("email"));
    if (element.value != null) {
      email = element.value;
    }

    var pwd, 
    element = (<HTMLInputElement>document.getElementById("pwd"));
    if (element.value != null) {
      pwd = element.value;
    }

    const user = await this.afAuth.auth.createUserWithEmailAndPassword(
      email,
      pwd
    );

    console.log(user);
  }
}
