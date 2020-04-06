import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

interface user {
    username: string,
    uid: string
}

@Injectable()
export class UserService {
    private user: user; 

    constructor(private firestore: AngularFirestore){}

    setUser(user: user) {
        this.user = user;
    }

    getUID() {
        return this.user.uid;
    }

    read() {
        return this.firestore.collection('users').snapshotChanges();
    }
}