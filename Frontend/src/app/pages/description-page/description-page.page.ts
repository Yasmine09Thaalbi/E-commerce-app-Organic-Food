import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-description-page',
  templateUrl: './description-page.page.html',
  styleUrls: ['./description-page.page.scss'],
})
export class DescriptionPagePage implements OnInit {
  product: any;
  decodedImage: string = '';
  previousUrl: string ='';

  constructor(private router: Router, private http: HttpClient,private location: Location) { }

  ngOnInit() {
    // Retrieve the product data passed from the home page
    if (history.state && history.state.product) {
      this.product = history.state.product;
      const state: any = this.location.getState();
      this.previousUrl = state.path;
   

      // Decode the base64 encoded image
      this.decodedImage = 'data:image/jpeg;base64,' + this.product.image
    } else {
      // Handle scenario where product data is not available
    }
  }
  goToAccountPage() {
    const regex = /(seller|boss|customer)-account\/\d+/;
    if (typeof this.previousUrl === 'string' && regex.test(this.previousUrl)) {
        this.location.back(); 
    } else {
        this.router.navigate(['/sign-in']); 
    }
  }
  goToHomePage() {
    this.router.navigate(['/home']);
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

}
