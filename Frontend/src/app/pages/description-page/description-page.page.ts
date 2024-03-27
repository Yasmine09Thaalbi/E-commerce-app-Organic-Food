import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router , RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-description-page',
  templateUrl: './description-page.page.html',
  styleUrls: ['./description-page.page.scss'],
})
export class DescriptionPagePage implements OnInit {
  //product: any;
  quantity: any = 1 ;
  decodedImage: string = '';
  product: any;
  userId:  string ='';
  userType:  string ='';
  orderedProducts: any[] = [];


  constructor(private router: Router, private http: HttpClient,private location: Location,private route: ActivatedRoute,    private alertController: AlertController) { }

  ngOnInit() {
    if (history.state && history.state.product) {
      this.product = history.state.product;
      console.log('Product:', this.product);
      if (history.state.orderedProducts) {
        this.orderedProducts = history.state.orderedProducts;
        console.log('Ordered Products:', this.orderedProducts);
      }
      if ( history.state.userId && history.state.userType) {
        this.userId = history.state.userId;
        this.userType = history.state.userType;
        console.log('UserID:', this.userId);
        console.log('UserType:', this.userType);
      }
      this.decodedImage = 'data:image/jpeg;base64,' + this.product.image;
    } else {
      // Gérer le scénario où les données du produit ne sont pas disponibles
    }
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

  add(){
    this.product.quantity = this.product.quantity ? this.product.quantity + 1 : 2;

    this.http.put<any>(`http://localhost:5000/API/products/${this.product._id}`, { quantity: this.product.quantity })
      .subscribe(
        (response) => {
          console.log('Quantity updated successfully:', response);
        },
        (error) => {
          console.error('Error updating quantity:', error);
        }
      );
  }

  remove(){

    this.product.quantity = this.product.quantity ? this.product.quantity - 1 : 0;
    if(this.product.quantity<0)
    {
      this.product.quantity=0;
    }

    this.http.put<any>(`http://localhost:5000/API/products/${this.product._id}`, { quantity: this.product.quantity })
      .subscribe(
        (response) => {
          console.log('Quantity updated successfully:', response);
        },
        (error) => {
          console.error('Error updating quantity:', error);
        }
      );
  }
  addclient(){
    this.quantity= this.quantity +1 ;
    if(this.quantity>this.product.quantity)
    {
      this.quantity = this.product.quantity;
    }

    if (this.userId) {
      console.log(this.product._id);
      this.http.put<any>(`http://localhost:5000/API/update/cart/${this.product._id}`, {  userId : this.userId , quantity: this.quantity })
      .subscribe(
      (response) => {
        console.log('Quantity updated successfully:', response);
      },
      (error) => {
        console.error('Error updating quantity:', error);
      }
    );

    } else {
      const orderedProductIndex = this.orderedProducts.findIndex((orderedProduct: any) => orderedProduct._id === this.product._id);
      if (orderedProductIndex !== -1) {
        this.orderedProducts[orderedProductIndex].quantity = this.quantity;
        console.log(this.orderedProducts)
      } else {
        this.orderedProducts.push({
          _id: this.product._id,
          quantity: 1
        });
      }
    }

  }

  removeclient(){
    this.quantity= this.quantity - 1 ;
    if(this.quantity<0)
    {
      this.quantity = 0;
    }
    if (this.userId) {
      console.log(this.product._id);
      this.http.put<any>(`http://localhost:5000/API/update/cart/${this.product._id}`, { userId : this.userId , quantity: this.quantity })
      .subscribe(
      (response) => {
        console.log('Quantity updated successfully:', response);
      },
      (error) => {
        console.error('Error updating quantity:', error);
      }
    );

    } else {
      const orderedProductIndex = this.orderedProducts.findIndex((orderedProduct: any) => orderedProduct._id === this.product._id);
      if (orderedProductIndex !== -1) {
        this.orderedProducts[orderedProductIndex].quantity = this.quantity;
        console.log(this.orderedProducts)
      } else {  
        this.orderedProducts.push({
          _id: this.product._id,
          quantity: 1
        });
      }
    }
  }

  async addToCart(product: any) {
    try {
     
      if (this.userId && this.userType === 'customer') {
        this.http.post(`http://localhost:5000/API/cart`, { product_id :this.product._id , userId: this.userId , quantity: this.quantity }).subscribe(
          async (response) => {
            console.log('Product added to cart:', response);
            await this.presentSuccessAlert();
          },
          (error) => {
            console.error('Error adding product to cart:', error);
          }
        );
      } else {
          const orderedProductIndex = this.orderedProducts.findIndex((orderedProduct: any) => orderedProduct._id === product._id);
          if (orderedProductIndex !== -1) {
            this.orderedProducts[orderedProductIndex].quantity = this.quantity;
            console.log(this.orderedProducts)
          } else {
            this.orderedProducts.push({
              _id: product._id,
              quantity: 1
            });
          }
        
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

}
