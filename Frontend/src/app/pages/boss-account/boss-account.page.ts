import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-boss-account',
  templateUrl: './boss-account.page.html',
  styleUrls: ['./boss-account.page.scss'],
})
export class BossAccountPage implements OnInit {
  userId: any;
  user: any;
  sellers: any[] = [];
  logout() {}
  deleteSeller() {
  }
  editSeller() {
  }
  GoAddSellerPage() {
    this.router.navigate(['/add-seller']);
  }
  GoProfilePage() {
    this.router.navigate([`/edit-profile/${this.userId}`]);
  }
  goToAccountPage() {
  }
  goToHomePage() {
    this.router.navigate(['/home']);
  }
  goBack() {
  }
  constructor(private router: Router ,private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.http.get<any>(`http://localhost:5000/API/user/${this.userId}`)
      .subscribe(response => {
        this.user = response;
        console.log(response);
      });

      this.http.get<any[]>('http://localhost:5000/API/sellers')
          .subscribe(
          (response) => {
            this.sellers = response;
            console.log(this.sellers);
          },
          (error) => {
            console.error(error);
          }
          );
      
  }
  getBase64Image(encodedImage: string): string {
    return 'data:image/jpeg;base64,' + encodedImage;
  }


  viewProductDescription(product: any) {
    // Navigate to the description page and pass the product data
    this.router.navigate(['/description-page'], { state: { product: product } });
  }


}
