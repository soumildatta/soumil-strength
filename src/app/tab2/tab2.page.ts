import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private firestore: AngularFirestore, public person: UserService) {}

  users: any;

  ngOnInit() {
    this.person.read().subscribe(data => {

      this.users = data.map(e => {
        return {
          id: e.payload.doc.id, 
          isEdit: false, 
          sessions: e.payload.doc.data()['sessions'],
          calories: e.payload.doc.data()['calories'],
          increase: e.payload.doc.data()['increase']
        }
      })
    })
  }
 
}
