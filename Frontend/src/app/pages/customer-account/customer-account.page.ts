import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.page.html',
  styleUrls: ['./customer-account.page.scss'],
})
export class CustomerAccountPage implements OnInit {
  user: any;
  userId: any;

  constructor(private router: Router ,private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.http.get<any>(`http://localhost:5000/API/user/${this.userId}`)
      .subscribe(response => {
        this.user = response;
        console.log(response);
      });
  }

  getBase64Image(encodedImage: string): string {
    return 'data:image/jpeg;base64,' + encodedImage;
  }

  logout() {}

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
  }


}
