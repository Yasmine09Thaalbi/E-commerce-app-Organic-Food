import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.page.html',
  styleUrls: ['./add-article.page.scss'],
})

export class AddArticlePage implements OnInit {

  articleForm!: FormGroup;
  @ViewChild('fileInput') fileInput: any;
  selectedImageFile: File | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.articleForm = this.formBuilder.group({
      category: ['', Validators.required],
      Product_Name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });
  }
  
  ngOnInit() {}

  async submitForm() {
    if (this.articleForm.valid) {
      const formData = new FormData();
      const articleData = this.articleForm.value;
  
      formData.append('category', articleData.category);
      formData.append('Product_Name', articleData.Product_Name);
      formData.append('description', articleData.description);
      formData.append('price', articleData.price);
      
      if (this.selectedImageFile) {
        formData.append('image', this.selectedImageFile, this.selectedImageFile.name);
      }
  
      this.http.post<any>('http://localhost:5000/API/add_article', formData)
        .subscribe(
          async (response) => {
            console.log(response);
            window.alert('Data inserted successfully');
            this.router.navigate(['/seller-account']);
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
  }

  goToHomePage() {
    this.router.navigate(['/home']);
  }

  goBack() {
  }
}
