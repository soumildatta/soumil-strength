import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { stringify } from 'querystring';
import { ToastController } from '@ionic/angular';

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
  user: User = {}

  constructor(private router: Router, public afAuth: AngularFireAuth, private toastController: ToastController) { }

  ngOnInit() {
  }

  async login() {
    var errormsg = "";

    await this.afAuth.auth.signInWithEmailAndPassword(
      this.user.email, 
      this.user.password
    ).catch(error => {
      errormsg = error.message;
    })
    // console.log(user);

    if (errormsg != "") {
      // error toast

      // if user does not exist, simplify error message
      if (errormsg === "There is no user record corresponding to this identifier. The user may have been deleted.") {
        const toast = await this.toastController.create({
          message: "No user with this email exists",
          duration: 2000, 
          color: "danger"
        });
        toast.present();
      } else if (errormsg != "") {
        // email or password problem
        const toast = await this.toastController.create({
          message: "Email or password incorrect!",
          duration: 2000, 
          color: "danger"
        });
        toast.present();
      } 
    } else {
      // successfully login
      this.router.navigateByUrl('/tabs');
      // console.log(this.afAuth.auth.currentUser.displayName);
    }
  }

  async signup() {
    this.router.navigateByUrl('/signup');
  }
}