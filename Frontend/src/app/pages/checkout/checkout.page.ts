import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  checkoutForm!: FormGroup;
  userId:  string ='';
  
  constructor(private http: HttpClient,private navCtrl: NavController,private router: Router,
    private route: ActivatedRoute,private location: Location,private formBuilder: FormBuilder, private alertController: AlertController) {
      this.checkoutForm = this.formBuilder.group({
        fullName: ['', Validators.required],
        address: ['', Validators.required],
        streetAddress: ['', Validators.required],
        postalCode: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        paymentMethod: [''] ,
        cardHolderName: [''],
        cardNumber: [''],
        expiryDate: [''],
        cvv: ['']
      });
    }
  
    async submitForm() {
      if (this.checkoutForm.valid) {
        const data = { ...this.checkoutForm.value, userId: this.userId }; 
        try {
          const response = await this.http.post<any>('http://localhost:5000/API/register_order', data).toPromise();
          console.log('Order registered successfully. Order ID:', response.orderId);
          await this.presentSuccessAlert();
          // Redirect to its home page
        } catch (error) {
          console.error('Error registering order:', error);
        }
      } else {
        console.error('Form is invalid. Please fill in all required fields.');
      }
    }

    async presentSuccessAlert() {
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Order added successfully',
        buttons: ['OK']
      });
    
      await alert.present();
    }
  

    async ngOnInit() {
      this.userId = this.route.snapshot.queryParams['userId'];
      console.log('User ID:', this.userId);
    }



  goBack() {
    this.location.back();
  }

  goToAccountPage() {

  }

  goToHomePage() {
  }

}
