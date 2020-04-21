import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
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
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  //Constructor ****************************************************
  constructor(public toastController: ToastController, public afAuth: AngularFireAuth, private firestore: AngularFirestore, public person: UserService ) {}

  users: any;

  //Onint ****************************************************
  ngOnInit() {
    this.person.read().subscribe(data => {
      
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          bench: e.payload.doc.data()['bench'],
          squat: e.payload.doc.data()['squat'],
          overhead: e.payload.doc.data()['overhead'],
        }
      })
      console.log(this.users);
    })
  }

  //User Declaration
  user: User = {
    username: this.afAuth.auth.currentUser.displayName,
  }


  //Finish Button ********************************************
  async finish() {
    const toast = await this.toastController.create({
      message: 'Good Job! Workout complete',
      duration: 2000
    });
    toast.present();
    //write to firestore
    this.firestore.doc('users/$this.person.getUID()}').update({
      bench: this.users.bench,
      squat: this.users.squat,
      overhead: this.users.overhead
    })

  }

}
