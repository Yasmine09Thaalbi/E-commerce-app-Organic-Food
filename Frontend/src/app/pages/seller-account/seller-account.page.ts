import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-seller-account',
  templateUrl: './seller-account.page.html',
  styleUrls: ['./seller-account.page.scss'],
})
export class SellerAccountPage implements OnInit {
  userId: any;
  user: any;
  products: any[] = [];
  modified: boolean = false;
 
  logout() {
    this.router.navigate(['/intro']);
   
  }
  GoAddArticlePage() {
    this.router.navigate([`/add-article/${this.userId}`]);
    
  }

  GoProfilePage() {
    this.router.navigate([`/edit-profile/${this.userId}`]);
  }
  goToAccountPage() {
    window.location.reload();
    
  }
  goToHomePage() {
    this.router.navigate(['/home']);
  }
  goBack() {
    this.location.back();
  }

  constructor(private router: Router ,private route: ActivatedRoute, private http: HttpClient,private location: Location) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      this.modified = params['modified'] === 'true';
      if (this.modified) {
        
        this.http.get<any>(`http://localhost:5000/API/user/${this.userId}`)
      .subscribe(response => {
        this.user = response;
        console.log(response);
      });

      this.http.get<any[]>(`http://localhost:5000/API/articles/${this.userId}`)
          .subscribe(
          (response) => {
            this.products = response;
            console.log(this.products);
          },
          (error) => {
            console.error(error);
          }
          );
      
        
      }
    });
    console.log(this.userId)
    this.http.get<any>(`http://localhost:5000/API/user/${this.userId}`)
      .subscribe(response => {
        this.user = response;
        console.log(response);
      });

      this.http.get<any[]>(`http://localhost:5000/API/articles/${this.userId}`)
          .subscribe(
          (response) => {
            this.products = response;
            console.log(this.products);
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
    const currentPath: string = this.router.url;
    this.router.navigate(['/description-page'], { state: { product: product, path: currentPath }  });
}

}
