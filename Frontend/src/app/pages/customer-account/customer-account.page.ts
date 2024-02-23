import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.page.html',
  styleUrls: ['./customer-account.page.scss'],
})
export class CustomerAccountPage implements OnInit {
  logout() {}
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
