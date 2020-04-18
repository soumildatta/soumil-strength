import { Component } from '@angular/core';
import { PopoverController, ActionSheetController, ToastController, PickerController } from '@ionic/angular';
import { ProfilePopoverComponent } from '../profile-popover/profile-popover.component';
import { ConditionalExpr } from '@angular/compiler';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';
import { UserService } from '../user.service';

//User Interface ************************************************
interface User {
  username?: string;
  age?: string;
  weight?: string;
  gender?: string;
  goals?: string;
  bench?: number;
  squat?: number;
  overhead?: number;
  completed?: boolean;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  
  //Constructor ****************************************************
  constructor(private firestore: AngularFirestore, public popoverController: PopoverController, public actionSheetController: ActionSheetController, public toastController: ToastController, public pickerController: PickerController, public afAuth: AngularFireAuth, public person: UserService) {}

  users: any;

  ngOnInit() {
    this.person.read().subscribe(data => {
      
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          age: e.payload.doc.data()['age'],
          weight: e.payload.doc.data()['weight'],
          gender: e.payload.doc.data()['gender'],
          goals: e.payload.doc.data()['goals']
        }
      })
      console.log(this.users);
    })
  }

  user: User = {
    username: this.afAuth.auth.currentUser.displayName,
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