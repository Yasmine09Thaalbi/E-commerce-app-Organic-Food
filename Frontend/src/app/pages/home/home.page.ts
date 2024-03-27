import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  orderedProducts: any[] = [];
  userId:any;
  userType:any;
  quantity:any = 1;
  

  constructor(private http: HttpClient,private navCtrl: NavController,private router: Router,
    private location: Location,    private alertController: AlertController,private route: ActivatedRoute
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
    let stateData: any = {
      product: product
    };
    if (this.userId && this.userType) {
      console.log('UserID:', this.userId);
      console.log('UserType:', this.userType);
      stateData.userId = this.userId;
      stateData.userType = this.userType;
      
    } else {
      if (this.orderedProducts ) {
        stateData.orderedProducts = this.orderedProducts;
      }
    }
    this.router.navigate(['/description-page'], { state: stateData });
  }
  
  
  

  CartPage() {
    let stateData: any = {};
    if (this.userId && this.userType) {
      console.log('UserID:', this.userId);
      console.log('UserType:', this.userType);
      stateData.userId = this.userId;
      stateData.userType = this.userType;
      
    } else {
      if (this.orderedProducts ) {
        stateData.orderedProducts = this.orderedProducts;
      }
    }

    this.router.navigate(['/cart-page'], { state: stateData });
  }
  async addToCart(product: any) {
    try {
     
      if (this.userId && this.userType === 'customer') {
        this.http.post(`http://localhost:5000/API/cart`, { product_id :product._id , userId: this.userId , quantity: this.quantity }).subscribe(
          async (response) => {
            console.log('Product added to cart:', response);
            await this.presentSuccessAlert();
          },
          (error) => {
            console.error('Error adding product to cart:', error);
          }
        );
      } else {
          
            this.orderedProducts.push({
              _id: product._id,
              quantity: 1
            });
          
        
        console.log('Product added to local order:', product);
        this.presentSuccessAlert();
      }
      
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }
  

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Product added to the cart successfully',
      buttons: ['OK']
    });
  
    await alert.present();
  }


  goToAccountPage() {
    if (this.userId && this.userType) {
      switch (this.userType) {
        case 'customer':
          this.router.navigate([`/customer-account/${this.userId}`]);
          break;
        case 'seller':
          this.router.navigate([`/seller-account/${this.userId}`]);
          break;
        case 'Boss':
          this.router.navigate([`/boss-account/${this.userId}`]);
          break;
        default:
          console.error('Invalid user type');
          break;
      }  
    } else {
        this.router.navigate(['/sign-in']); 
    }
  }

  goToHomePage() {
    let stateData: any = {};
    if (this.userId && this.userType) {
      console.log('UserID:', this.userId);
      console.log('UserType:', this.userType);
      this.router.navigate(['/home'], { queryParams: { userId: this.userId, userType: this.userType } });
    } else {
      if (this.orderedProducts ) {
        stateData.orderedProducts = this.orderedProducts;
        this.router.navigate(['/home'], { state: stateData });
      }
    }
  }

  goBack() {
    this.location.back();
  }
  ngOnInit(){
    
    this.userId = this.route.snapshot.queryParams['userId'];
    this.userType = this.route.snapshot.queryParams['userType'];
    if (history.state && history.state.orderedProducts ) {
        this.orderedProducts = history.state.orderedProducts;
          
    }
   console.log('Ordered Products:', this.orderedProducts); 
}
}
