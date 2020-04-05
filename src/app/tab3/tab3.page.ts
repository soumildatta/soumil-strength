import { Component } from '@angular/core';
import { PopoverController, ActionSheetController, ToastController, PickerController } from '@ionic/angular';
import { ProfilePopoverComponent } from '../profile-popover/profile-popover.component';
import { ConditionalExpr } from '@angular/compiler';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';
import { UserService } from '../user.service';

interface User {
  username?: string;
  age?: string;
  weight?: string;
  gender?: string;
  goals?: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  userProfile;
  profile;
  
  constructor(private firestore: AngularFirestore, public popoverController: PopoverController, public actionSheetController: ActionSheetController, public toastController: ToastController, public pickerController: PickerController, public afAuth: AngularFireAuth, public person: UserService) {
    this.profile = firestore.doc(`users/${person.getUID()}`)
  }

   // username from auth
  user: User = {
    username: this.afAuth.auth.currentUser.displayName,
    weight: this.firestore.doc(`users/${this.person.getUID()}`)[1]
  }

  getRange(n: number, startFrom: number): number[] {
    return [...Array(n).keys()].map(i => i + startFrom);
  }


  // present toast when save button clicked
  async save() {
    const toast = await this.toastController.create({
      message: 'Your profile has been updated!',
      duration: 2000
    });
    toast.present();

    console.log(this.user.age);
    console.log(this.user.weight);
    console.log(this.user.gender);
    console.log(this.user.goals);

    this.firestore.doc(`users/${this.person.getUID()}`).update({
      age: this.user.age,
      weight: this.user.weight,
      gender: this.user.gender,
      goals: this.user.goals
    })

    console.log(this.firestore.doc(`users/${this.person.getUID()}`));
    // const items = this.firestore.doc;
    // console.log(this.firestore.collection('users').valueChanges());
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