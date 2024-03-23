import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginForm.patchValue({
          email: '',
          password: ''
        });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authService.login_get_request(formData.email, formData.password).subscribe(
        (response: any) => {
          console.log(response);
          const userId = response.userId;
          const userType = response.userType; 
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
        },
        error => {
          console.error('Error:', error);
        }
      );
    } 
  }
  
  
  
}
