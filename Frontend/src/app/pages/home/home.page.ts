import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  products: any[] = [];

  constructor(private http: HttpClient,private navCtrl: NavController,private router: Router) {}

  //Fonction to display the products by category 
  loadProductsByCategory(category: string) {
    // Assuming you have an API endpoint to fetch products by category
    this.http.get<any[]>(`http://localhost:5000/API/products/${category}`).subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //Fonction to display all the products 
  loadAllProducts() {
    this.http.get<any[]>('http://localhost:5000/API/products/all').subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('Error fetching all products:', error);
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

  CartPage() {
  }

  addToCart() {}

  goToAccountPage() {}

  goToHomePage() {
  }

  goBack() {}

  goToCartPage() {}

}
