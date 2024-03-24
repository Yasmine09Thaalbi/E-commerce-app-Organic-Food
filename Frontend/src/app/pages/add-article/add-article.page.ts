import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.page.html',
  styleUrls: ['./add-article.page.scss'],
})

export class AddArticlePage implements OnInit {

  articleForm!: FormGroup;
  @ViewChild('fileInput') fileInput: any;
  selectedImageFile: File | undefined;
  userId: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location

  ) {
    this.articleForm = this.formBuilder.group({
      category: ['', Validators.required],
      Product_Name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }
  
  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id_seller');
  }

  async submitForm() {
    if (this.articleForm.valid) {
      const formData = new FormData();
      const articleData = this.articleForm.value;
  
      formData.append('category', articleData.category);
      formData.append('Product_Name', articleData.Product_Name);
      formData.append('description', articleData.description);
      formData.append('price', articleData.price);
      formData.append('quantity', articleData.quantity);
      formData.append('id_Seller', this.userId); 
      
      if (this.selectedImageFile) {
        formData.append('image', this.selectedImageFile, this.selectedImageFile.name);
      }
  
      this.http.post<any>('http://localhost:5000/API/add_article', formData)
        .subscribe(
          async (response) => {
            console.log(response);
            window.alert('Data inserted successfully');
            this.router.navigate([`/seller-account/${this.userId}`]);
          },
          (error) => {
            console.error(error);
          }
        );
    } else {
      // Handle form validation errors
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
    }
  }

  goToAccountPage() {
    this.router.navigate([`/seller-account/${this.userId}`]);
    
  }

  goToHomePage() {
    this.router.navigate(['/home']);
  }

  goBack() {
    this.location.back();
  }
}
