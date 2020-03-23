import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public toastController: ToastController) {}

  async finish() {
    const toast = await this.toastController.create({
      message: 'Good Job! Workout complete',
      duration: 2000
    });
    toast.present();
  }

}
