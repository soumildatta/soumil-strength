import { Component } from '@angular/core';
import { PopoverController, ActionSheetController } from '@ionic/angular';
import { ProfilePopoverComponent } from '../profile-popover/profile-popover.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public popoverController: PopoverController, public actionSheetController: ActionSheetController) {}

  // popover displaying about page option and logout option
  async openPopover(event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event,
      translucent: true
    });
    return await popover.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Edit Profile Picture',
      buttons: [{
        text: '  Upload Image',
        handler: () => {
          console.log('Upload clicked');
        }
      }, {
        text: 'Remove Image',
        role: 'destructive',
        handler: () => {
          console.log('Remove image pressed');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
