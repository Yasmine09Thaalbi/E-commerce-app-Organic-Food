import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-seller',
  templateUrl: './add-seller.page.html',
  styleUrls: ['./add-seller.page.scss'],
})
export class AddSellerPage implements OnInit {
  name!: string;
  email!: string;
  userId: any;

  goToAccountPage() {
    this.location.back();
  }
  goToHomePage() {
    this.router.navigate(['/home']);
  }
  goBack() {
    this.location.back();
  }
  constructor(private http: HttpClient, private router: Router ,private location: Location) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.userId = navigation.extras.state['userId'];
    }
  }

  addSeller() {
    const sellerData = {
      name: this.name,
      email: this.email,
      cansell: true 
    };

    this.http.put<any>('http://localhost:5000/API/addseller', sellerData)
      .subscribe(
        response => {
          console.log('Seller added successfully!', response);
          this.router.navigate([`/boss-account/${this.userId}`], { queryParams: { modified: 'true' } });
        },
        error => {
          console.error('Error adding seller:', error);
        }
      );
  }
}
