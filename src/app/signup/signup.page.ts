import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

// enforce strict checking
interface User {
  email?: string;
  password?: string;
  passwordCheck?: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user: User = {}

  constructor(private router: Router, public afAuth: AngularFireAuth, private toastController: ToastController) { }

  ngOnInit() {
  }

  async signup() {
    var errormsg = "";
    
    if(this.user.password != this.user.passwordCheck) {
      // passwords do not match

      const toast = await this.toastController.create({
        message: 'Your passwords do not match!',
        duration: 2000,
        color: "warning"
      });
      toast.present();
    } else {
      // create firebase user 
      // catches error message and stores it in errormsg

      await this.afAuth.auth.createUserWithEmailAndPassword(
        this.user.email, 
        this.user.password
      ).catch(error => {
        errormsg = error.message;
      });

      if (errormsg != "") {
        // present error message toast

        const toast = await this.toastController.create({
          message: errormsg,
          duration: 2000,
          color: "danger"
        });
        toast.present();
      } else {
        // user successfully created 

        this.user.email = "";
        this.user.password = "";
        this.user.passwordCheck = "";

        const toast = await this.toastController.create({
          message: 'User created! Return to the login page to login',
          duration: 2000,
          color: "success"
        });

        toast.present();
      }
    }
  }

  login() {
    this.router.navigateByUrl('/login');
  }

}