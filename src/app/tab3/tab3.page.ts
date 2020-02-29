import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from '../profile-popover/profile-popover.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public popoverController: PopoverController) {}

  // popover displaying about page option and logout option
  async openPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
      translucent: true
    });
    return await popover.present();
  }
}
