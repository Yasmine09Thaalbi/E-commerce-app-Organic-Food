import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.page.html',
  styleUrls: ['./cart-page.page.scss'],
})
export class CartPagePage implements OnInit {
  cartItems: any[] = [];
  product: any;
  userId:  string ='';
  userType:  string ='';
  orderedProducts: any[] = [];
  shipping_charges:any =1.6;
  

  decreaseQuantity(item: any) {
    if (item.quantity > 0) {
      item.quantity--;
      this.updateOrderedProductsQuantity(item.product_id, item.quantity);
      console.log(this.orderedProducts)
      this.calculateTotal();
    }
  }
  
  increaseQuantity(item: any) {
    item.quantity++;
    if(item.quantity>item.details[0].quantity)
      item.quantity=item.details[0].quantity;
    this.updateOrderedProductsQuantity(item.product_id, item.quantity);
    console.log(this.orderedProducts)
    this.calculateTotal();
  }
  
  updateOrderedProductsQuantity(productId: string, newQuantity: number) {
    const foundProduct = this.orderedProducts.find(product => product._id === productId);
    if (foundProduct) {
      foundProduct.quantity = newQuantity;
    }
    if (this.userId) {
        console.log(productId);
        this.http.put<any>(`http://localhost:5000/API/update/cart/${productId}`, {  userId : this.userId , quantity: newQuantity })
        .subscribe(
        (response) => {
          console.log('Quantity updated successfully:', response);
        },
        (error) => {
          console.error('Error updating quantity:', error);
        }
      );
    }
  
  }
 

  calculateTotal() {
    
    return this.cartItems.reduce((acc, item) => acc + item.quantity * item.details[0].price, 0);
    
  }

  checkout(total: number, productNames: string[]) {
    this.router.navigate(['/checkout'], { 
      queryParams: { 
        userId: this.userId,
        userType: this.userType,
        total: total,
        productNames: productNames.join(', ') 
      } 
    });
  }

  constructor(private http: HttpClient,private navCtrl: NavController,private router: Router,
  private location: Location,
  ) {}

  

  ngOnInit() {
    if (history.state ) {
      if (history.state.orderedProducts) {
        this.orderedProducts = history.state.orderedProducts;
        console.log('Ordered Products:', this.orderedProducts);
        for (const orderedProduct of this.orderedProducts) {
          const productId = orderedProduct._id;
          this.http.get<any>(`http://localhost:5000/API/productsbyId/${productId}`).subscribe(
              (productDetails) => {
                  const cartItem = {
                      product_id: productId,
                      quantity: orderedProduct.quantity,
                      details: productDetails 
                  };
                  this.cartItems.push(cartItem);
                  

              },
              (error) => {
                  console.error('Error fetching product details:', error);
              }
          );
      }
      console.log(this.cartItems)
      }
      if ( history.state.userId && history.state.userType) {
        this.userId = history.state.userId;
        this.userType = history.state.userType;
        console.log('UserID:', this.userId);
        console.log('UserType:', this.userType);
        this.http.get<any>(`http://localhost:5000/API/cart/${this.userId}`).subscribe(
        (response) => {
          console.log('Cart Items:', response.cart_items);
          this.orderedProducts = response.cart_items;
          console.log(this.orderedProducts)
          for (const orderedProduct of this.orderedProducts) {
            const productId = orderedProduct._id;
            this.http.get<any>(`http://localhost:5000/API/productsbyId/${productId}`).subscribe(
                (productDetails) => {
                    const cartItem = {
                        product_id: productId,
                        quantity: orderedProduct.quantity,
                        details: productDetails 
                    };
                    this.cartItems.push(cartItem);
                    
  
                },
                (error) => {
                    console.error('Error fetching product details:', error);
                }
            );
            }
        },
        (error) => {
          console.error('Error fetching cart items:', error);
        }
    );
      }
  }
}

getCartProductNames(): string[] {
  return this.cartItems.map(item => item.details[0].Product_Name);
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
  getBase64Image(encodedImage: string): string {
    return 'data:image/jpeg;base64,' + encodedImage;
  }

}
