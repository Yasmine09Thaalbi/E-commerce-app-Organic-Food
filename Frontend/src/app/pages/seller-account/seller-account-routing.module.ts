import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellerAccountPage } from './seller-account.page';

const routes: Routes = [
  {
    path: '',
    component: SellerAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerAccountPageRoutingModule {}
