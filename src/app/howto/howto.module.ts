import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HowtoPageRoutingModule } from './howto-routing.module';

import { HowtoPage } from './howto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HowtoPageRoutingModule
  ],
  declarations: [HowtoPage]
})
export class HowtoPageModule {}
