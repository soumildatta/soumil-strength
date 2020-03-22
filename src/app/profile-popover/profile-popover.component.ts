import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
})
export class ProfilePopoverComponent implements OnInit {

  constructor(public popoverController: PopoverController, private router: Router) {}

  ngOnInit() {}

  // close() {
  //   this.popoverController.dismiss();
  // }

  logout() {
    this.router.navigateByUrl('/login');
  }

  about() {
    this.router.navigateByUrl('/about');
  }
}
