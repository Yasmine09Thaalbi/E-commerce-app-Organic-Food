import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerAccountPageRoutingModule } from './customer-account-routing.module';

import { CustomerAccountPage } from './customer-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerAccountPageRoutingModule
  ],
  declarations: [CustomerAccountPage]
})
export class CustomerAccountPageModule {}
