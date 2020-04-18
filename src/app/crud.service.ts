import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class CrudService {
 
  constructor(
    private firestore: AngularFirestore
  ) { }
 
 
  create_newLifter(record) {
    return this.firestore.collection('Users').add(record);
  }
 
  read_lifter() {
    return this.firestore.collection('Users').snapshotChanges();
  }
 
  update_lifter(recordID,record){
    this.firestore.doc('Users/' + recordID).update(record);
  }
 
  delete_Lifter(record_id) {
    this.firestore.doc('Users/' + record_id).delete();
  }
}