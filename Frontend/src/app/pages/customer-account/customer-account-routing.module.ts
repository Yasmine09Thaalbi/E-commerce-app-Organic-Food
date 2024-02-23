import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerAccountPage } from './customer-account.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerAccountPageRoutingModule {}
