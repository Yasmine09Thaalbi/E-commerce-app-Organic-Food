import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.page.html',
  styleUrls: ['./customer-account.page.scss'],
})
export class CustomerAccountPage implements OnInit {
  toggleDetails(order: any) {
    order.showDetails = !order.showDetails;
  }
  user: any;
  userId: any;
  orders: any[] = [];

  constructor(private router: Router ,private route: ActivatedRoute,
    private http: HttpClient,private location: Location) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.http.get<any>(`http://localhost:5000/API/user/${this.userId}`)
      .subscribe(response => {
        this.user = response;
        console.log(response);
      });

    this.http.get<any>(`http://localhost:5000/API/orders/${this.userId}`)
      .subscribe(response => {
        this.orders = response;
        console.log('Orders:', response);
      });
  }

  getBase64Image(encodedImage: string): string {
    return 'data:image/jpeg;base64,' + encodedImage;
  }

  logout() {
    this.router.navigate(['/intro']);
  }

  GoEditProfilePage() {
    this.router.navigate([`/edit-profile/${this.userId}`]);
  }

  goToAccountPage() {
    window.location.reload();
  }

  
  goToHomePage() {
    this.router.navigate(['/home'], { queryParams: { userId: this.userId, userType: this.user.userType } });
  }
  goBack() {
    this.location.back();
  }


}
