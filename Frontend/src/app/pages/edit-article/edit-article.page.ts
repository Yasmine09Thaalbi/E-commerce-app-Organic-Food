import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.page.html',
  styleUrls: ['./edit-article.page.scss'],
})
export class EditArticlePage implements OnInit {
  editArticleForm!:FormGroup;
  @ViewChild('fileInput') fileInput: any;
  selectedImageFile: File | undefined;

  articleId!: any;
  userId:any;

  
  constructor(    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private alertController: AlertController
    ) { }

    goToAccountPage() {

    }
    goToHomePage() {
      this.router.navigate(['/home']);
  
    }
    goBack() {
      this.location.back();
    }
  


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.articleId = params.get('id');
      this.fetchArticleDetails();
    });

    this.editArticleForm = this.formBuilder.group({
      Product_Name: [''],
      description: [''],
      price: [''],
      quantity: ['']
    });
  }

  fetchArticleDetails() {
    this.http.get<any>(`http://localhost:5000/API/product/${this.articleId}`)
      .subscribe(response => {
        this.editArticleForm.patchValue({
          Product_Name: response.Product_Name,
          description: response.description,
          price: response.price,
          quantity: response.quantity
        });
      });
  }

  async submitForm() {
    if (this.editArticleForm.valid) {
      const formData = this.editArticleForm.value;
      this.http.put(`http://localhost:5000/API/product/${this.articleId}`, formData)
        .subscribe(
          async (response) => {
            console.log(response);
            await this.presentSuccessAlert();
            this.location.back();
            
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Product edited successfully',
      buttons: ['OK']
    });
    await alert.present();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
    }
  }
}


