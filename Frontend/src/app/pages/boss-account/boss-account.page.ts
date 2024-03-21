import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boss-account',
  templateUrl: './boss-account.page.html',
  styleUrls: ['./boss-account.page.scss'],
})
export class BossAccountPage implements OnInit {
  logout() {}
  deleteSeller() {
  }
  editSeller() {
  }
  GoAddSellerPage() {
    this.router.navigate(['/add-seller']);
  }
  GoProfilePage() {
    this.router.navigate(['/edit-profile']);
  }
  goToAccountPage() {
  }
  goToHomePage() {
    this.router.navigate(['/home']);
  }
  goBack() {
  }
  constructor(private router:Router) { }

  ngOnInit() {
  }

}
