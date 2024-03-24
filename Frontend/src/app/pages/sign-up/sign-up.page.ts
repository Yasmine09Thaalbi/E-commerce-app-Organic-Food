import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  signupForm!: FormGroup;
  @ViewChild('fileInput') fileInput: any;
  selectedImageFile: File | undefined;

  constructor(private auth: AuthService,private formBuilder: FormBuilder,private router: Router) {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      userType: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {
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
      const formData = new FormData();
      const signupFormData = this.signupForm.value;

      if (signupFormData.userType === 'seller') {
        signupFormData.canSell = false;
        formData.append('canSell', signupFormData.canSell);
      } 

      delete signupFormData.confirmPassword;
  
     
      formData.append('name', signupFormData.name);
      formData.append('email', signupFormData.email);
      formData.append('password', signupFormData.password);
      formData.append('userType', signupFormData.userType);
      
      formData.append('termsAccepted', signupFormData.termsAccepted);
   
      if (this.selectedImageFile) {
        formData.append('image', this.selectedImageFile, this.selectedImageFile.name);
      }

      this.auth.signup_post_request(formData).subscribe( response => {
        console.log(response);
       
        this.router.navigate(['/sign-in']);

        this.signupForm.reset();
      },
      error => console.error('Error:', error)
      );
  
    } 
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
    }
  }
}
