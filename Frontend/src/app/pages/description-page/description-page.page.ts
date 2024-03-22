import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-description-page',
  templateUrl: './description-page.page.html',
  styleUrls: ['./description-page.page.scss'],
})
export class DescriptionPagePage implements OnInit {
  product: any;
  decodedImage: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    // Retrieve the product data passed from the home page
    if (history.state && history.state.product) {
      this.product = history.state.product;

      // Decode the base64 encoded image
      this.decodedImage = 'data:image/jpeg;base64,' + this.product.image
    } else {
      // Handle scenario where product data is not available
    }
  }
  goToAccountPage() {
    throw new Error('Method not implemented.');
    }
  goToHomePage() {
    this.router.navigate(['/home']);
  }
    goBack() {
    throw new Error('Method not implemented.');
    }

}
