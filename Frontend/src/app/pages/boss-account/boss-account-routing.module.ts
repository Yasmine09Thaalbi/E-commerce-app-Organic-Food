import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BossAccountPage } from './boss-account.page';

const routes: Routes = [
  {
    path: '',
    component: BossAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BossAccountPageRoutingModule {}
