import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

    @ViewChild('fileInput') fileInput: any;
    selectedImageFile: File | undefined;
    updateForm!: FormGroup;
    userId: any;

    constructor( private formBuilder: FormBuilder, private http: HttpClient,private router: Router,private route: ActivatedRoute,private location: Location) {
      this.updateForm = this.formBuilder.group({
        newName: ['', Validators.required],
        newPassword: ['', Validators.required],
      });
    }
  
    ngOnInit() {
      this.userId = this.route.snapshot.paramMap.get('id_seller');
    }
  
    submitForm() {
      if (this.updateForm.valid) {
      const updatedProfile = new FormData();
      const updateData = this.updateForm.value;

      updatedProfile.append('name', updateData.newName);
      updatedProfile.append('password', updateData.newPassword);
    
      if (this.selectedImageFile) {
        updatedProfile.append('image', this.selectedImageFile, this.selectedImageFile.name);
      }
    
  
      this.http.put<any>(`http://localhost:5000/API/update_profile/${this.userId}`, updatedProfile)
        .subscribe(
          response => {
            console.log(response);
            
            // if (response.userType === 'seller') {
            //   this.router.navigate([`/seller-account/${this.userId}`]);
            // } else if (response.userType === 'customer') {
            //   this.router.navigate([`/customer-account/${this.userId}`]);
            // }
            this.location.back();


            this.updateForm.reset();
          },
          error => {
            console.error('Error updating profile:', error);
          }
        );
      }
    }


    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.selectedImageFile = file;
      }
    }

    goToAccountPage() {
      this.location.back();
    }
    goToHomePage() {
      this.router.navigate(['/home']);
    }
    goBack() {
      this.location.back();
    }

}
