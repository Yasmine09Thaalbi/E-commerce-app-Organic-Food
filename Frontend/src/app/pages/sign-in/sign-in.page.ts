import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  loginForm!: FormGroup;
  total:any;
  productNames: any[] = [];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginForm.patchValue({
          email: '',
          password: ''
        });

    const queryParams = this.route.snapshot.queryParams;
    if (queryParams !== null) {
    this.total = queryParams['total'];
    if (queryParams['productNames'] !== undefined) {
      this.productNames = queryParams['productNames'].split(', ');
    }
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authService.login_get_request(formData.email, formData.password).subscribe(
        (response: any) => {
          console.log(response);
          const userId = response.userId;
          const userType = response.userType;
          if(this.total && this.productNames)
          {
            this.router.navigate(['/checkout'], { 
              queryParams: { 
                userId: userId,
                userType: userType,
                total: this.total,
                productNames: this.productNames.join(', ') 
              } 
            });
          }
          else{
            switch (userType) {
              case 'customer':
                this.router.navigate([`/customer-account/${userId}`]);
                break;
              case 'seller':
                this.router.navigate([`/seller-account/${userId}`]);
                break;
              case 'Boss':
                this.router.navigate([`/boss-account/${userId}`]);
                break;
              default:
                console.error('Invalid user type');
                break;
            }
    
            this.loginForm.patchValue({
              email: '',
              password: ''
            });
            
          }
          
        },
        error => {
          console.error('Error:', error);
        }
      );
    } 
  }
  
  
  
}
