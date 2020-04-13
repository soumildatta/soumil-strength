import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
})
export class ProfilePopoverComponent implements OnInit {

  constructor(public popoverController: PopoverController, private router: Router, public afAuth: AngularFireAuth) {}

  ngOnInit() {}

  // close() {
  //   this.popoverController.dismiss();
  // }

  async logout() {

    var errormsg = "";
    await this.afAuth.auth.signOut().catch(error => {
      errormsg = error.message;
    })

    if (errormsg === "") {
      this.router.navigateByUrl('/login');
    }
  }

  changepswd() {
    this.router.navigateByUrl('/changepassword');
  }

  about() {
    this.router.navigateByUrl('/about');
  }
}
