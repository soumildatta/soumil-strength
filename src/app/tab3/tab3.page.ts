import { Component } from '@angular/core';
import { PopoverController, ActionSheetController, ToastController, PickerController } from '@ionic/angular';
import { ProfilePopoverComponent } from '../profile-popover/profile-popover.component';
import { ConditionalExpr } from '@angular/compiler';
import { AngularFireAuth } from '@angular/fire/auth';

interface User {
  username?: string;
  age?: string;
  gender?: string;
}

// implement better way of listing ages
const ageOptions = [
  [
    5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90
  ]
]

const heightOptions = [
  [
    '3\'', '4\'', '5\'',
    '6\'', '7\''
  ],
  [
    '1"',  '2"',  '3"', '4"',
    '5"',  '6"',  '7"', '8"',
    '9"', '10"', '11"', '12"'
  ]
]

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  // username from auth
  user: User = {
    username: this.afAuth.auth.currentUser.displayName
  }

  constructor(public popoverController: PopoverController, public actionSheetController: ActionSheetController, public toastController: ToastController, public pickerController: PickerController, public afAuth: AngularFireAuth) {}

  getRange(n: number, startFrom: number): number[] {
    return [...Array(n).keys()].map(i => i + startFrom);
  }

  // picker for height and age
  // TODO show the selected height and age in the label text
  // TODO fix the feet overflow
  async agePicker(numColumns = 1, numOptions = ageOptions[0].length, columnOptions = ageOptions){
    const picker = await this.pickerController.create({
      columns: this.getColumns(numColumns, numOptions, columnOptions),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (value) => {
            console.log(`Got Value ${value}`);
          }
        }
      ]
    });
    await picker.present();
  }

  async heightPicker(numColumns = 2, numOptions = 12, columnOptions = heightOptions){
    const picker = await this.pickerController.create({
      columns: this.getColumns(numColumns, numOptions, columnOptions),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (value) => {
            console.log(`Got Value ${value}`);
          }
        }
      ]
    });
    await picker.present();
  }

  getColumns(numColumns, numOptions, columnOptions) {
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col-${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions)
      });
    }
    return columns;
  }

  getColumnOptions(columnIndex, numOptions, columnOptions) {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i
      })
    }

    return options;
  }


  // present toast when save button clicked
  async save() {
    const toast = await this.toastController.create({
      message: 'Your profile has been updated! (Not really yet)',
      duration: 2000
    });
    toast.present();

    console.log(this.user.age);
    console.log(this.user.gender);
  }

  // Present options to remove or upload profile picture
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