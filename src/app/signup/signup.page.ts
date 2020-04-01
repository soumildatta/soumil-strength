import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

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
    if(this.user.password != this.user.passwordCheck) {
      const toast = await this.toastController.create({
        message: 'Your passwords do not match!',
        duration: 2000
      });
      toast.present();
    } else {
      await this.afAuth.auth.createUserWithEmailAndPassword(
        this.user.email, 
        this.user.password
      );
      this.user.email = "";
      this.user.password = "";
      this.user.passwordCheck = "";

      const toast = await this.toastController.create({
        message: 'User created! Return to the login page to login',
        duration: 2000
      });
      toast.present();
    }
  }

  login() {
    this.router.navigateByUrl('/login');
  }

}
