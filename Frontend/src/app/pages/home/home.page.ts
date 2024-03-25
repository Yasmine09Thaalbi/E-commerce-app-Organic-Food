import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  products: any[] = [];

  constructor(private http: HttpClient,private navCtrl: NavController,private router: Router,
    private location: Location,    private alertController: AlertController
    ) {}

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
        console.log(this.products)
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
    this.router.navigate(['/description-page'], { state: { product: product } });
  }

  CartPage() {
    this.router.navigate(['/cart-page']);
  }

  // Function to add product to cart
   async addToCart(product: any) {
    this.http.post('http://localhost:5000/API/cart', product).subscribe(
      async (response) => {
        console.log('Product added to cart:', response);
        await this.presentSuccessAlert();
      },
      (error) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Product added to the cart successfully',
      buttons: ['OK']
    });
  
    await alert.present();
  }


  goToAccountPage() {}

  goToHomePage() {
    this.router.navigate(['/home']);
  }

  goBack() {
    this.location.back();
  }
}
