import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.page.html',
  styleUrls: ['./cart-page.page.scss'],
})
export class CartPagePage implements OnInit {

  public cartItems = [
    { name: 'Oignons rouges', quantity: 2 , price : 45 },
    { name: 'Tomates fraîches', quantity: 3 , price : 47 },
   
  ];

  public total = this.calculateTotal();

  decreaseQuantity(item: any) {
    if (item.quantity > 0) item.quantity--;
    this.total = this.calculateTotal();
  }
  increaseQuantity(item: any) {
    item.quantity++;
    this.total = this.calculateTotal();
  }

  calculateTotal() {
    return this.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }

  checkout() {
    
  }
  goToAccountPage() {
    throw new Error('Method not implemented.');
    }
    goToHomePage() {
    throw new Error('Method not implemented.');
    }
    goBack() {
    throw new Error('Method not implemented.');
    }

  constructor() { }

  ngOnInit() {
  }

}
