import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
    signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService , private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue],
      userType: ['', Validators.required]
    }, {
      validators: this.validatePasswordConfirmation.bind(this)
    });

    this.signupForm.patchValue({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
      userType: ''
    });
  }

  validatePasswordConfirmation(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }

  submitForm() {
    if (this.signupForm.valid) {
      const formValueToSend = { ...this.signupForm.value };
      delete formValueToSend.confirmPassword;
  
     
      console.log(formValueToSend);
      this.auth.signup_post_request(formValueToSend).subscribe( response => {
        console.log(response);
       
        this.router.navigate(['/sign-in']);

        this.signupForm.reset();
      },
      error => console.error('Error:', error)
      );
  
    } 
  }
}
