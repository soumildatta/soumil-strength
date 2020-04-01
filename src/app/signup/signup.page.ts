import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

interface User {
  email?: string;
  password?: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user: User = {
    email: "testingfromauth@gmail.com", 
    password: "testing"
  }

  constructor(private router: Router, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async signup() {
    await this.afAuth.auth.createUserWithEmailAndPassword(
      this.user.email, 
      this.user.password
    );
  }

  login() {
    this.router.navigateByUrl('/login');
  }

}
