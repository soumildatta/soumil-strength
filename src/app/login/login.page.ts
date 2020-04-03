import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { stringify } from 'querystring';
import { ToastController } from '@ionic/angular';
import { NgFormSelectorWarning } from '@angular/forms';

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

  async forgot() {

    // prompt user to work with the email field available
    if(this.user.email == "" || this.user.email == null) {
      const toast = await this.toastController.create({
        message: "Please enter an email you signed up with to retrieve your password!",
        duration: 2000,
        color: "warning"
      });
      toast.present();
    } else {
      this.afAuth.auth.sendPasswordResetEmail(this.user.email);

      // present toast that email has been sent 
      const toast = await this.toastController.create({
        message: "Your password reset email has been sent",
        duration: 2000,
        color: "success"
      });
      toast.present();
    }
  }

  async login() {
    var errormsg = "";

    if(this.user.email == "" || this.user.password == "" || this.user.email == null || this.user.password == null) {
      const toast = await this.toastController.create({
        message: "Please input a valid email and password",
        duration: 2000,
        color: "warning"
      });
      toast.present();
    } else {
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
  }

  async signup() {
    this.router.navigateByUrl('/signup');
  }
}