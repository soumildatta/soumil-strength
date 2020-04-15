import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { UserService } from '../user.service';

interface User {
  email?: string;
}

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  user: User = {}

  constructor(private router: Router, private afAuth: AngularFireAuth, private toastController: ToastController, private person: UserService) {}

  ngOnInit() {
  }

  back() {
    this.router.navigateByUrl('/tabs/tab3');
  }

  async change() {
    // prompt user to work with the email field available
    if(this.user.email != this.person.getEmail() || this.user.email == null) {
      const toast = await this.toastController.create({
        message: "Please enter the email you logged in with to retrieve your password!",
        duration: 2000,
        color: "warning"
      });
      toast.present();
    } else {
      this.afAuth.auth.sendPasswordResetEmail(this.user.email);

      // present toast that email has been sent 
      const toast = await this.toastController.create({
        message: "An email has been sent to your email to change your password",
        duration: 2000,
        color: "success"
      });
      toast.present();
    }
  }
}
