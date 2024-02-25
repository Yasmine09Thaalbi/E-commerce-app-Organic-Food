import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-account',
  templateUrl: './seller-account.page.html',
  styleUrls: ['./seller-account.page.scss'],
})
export class SellerAccountPage implements OnInit {
  logout() {}
  GoAddArticlePage() {
    this.router.navigate(['/add-article']);
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

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
