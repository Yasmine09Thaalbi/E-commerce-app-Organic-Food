import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BossAccountPageRoutingModule } from './boss-account-routing.module';

import { BossAccountPage } from './boss-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BossAccountPageRoutingModule
  ],
  declarations: [BossAccountPage]
})
export class BossAccountPageModule {}
