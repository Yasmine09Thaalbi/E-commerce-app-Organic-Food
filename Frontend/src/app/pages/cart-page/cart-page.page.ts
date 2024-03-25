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
    this.router.navigate(['/checkout']);
    
  }

  constructor(private http: HttpClient,private navCtrl: NavController,private router: Router,
  private location: Location,
  ) {}

  

  ngOnInit() {
  }

  goToAccountPage() {

  }
  
  goToHomePage() {
    this.router.navigate(['/home']);
  }
  goBack() {
    this.location.back();
  }

}
