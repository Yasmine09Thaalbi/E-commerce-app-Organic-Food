import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellerAccountPageRoutingModule } from './seller-account-routing.module';

import { SellerAccountPage } from './seller-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellerAccountPageRoutingModule
  ],
  declarations: [SellerAccountPage]
})
export class SellerAccountPageModule {}
