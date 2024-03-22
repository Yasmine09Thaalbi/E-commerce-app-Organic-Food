import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  goToAccountPage() {
    throw new Error('Method not implemented.');
    }
    goToHomePage() {
    throw new Error('Method not implemented.');
    }
    goBack() {
    throw new Error('Method not implemented.');
    }
    userId: any;
    newName!: string;
    newEmail!: string;
    newPassword!: string;
  
    constructor(private http: HttpClient, private route: ActivatedRoute) { }
  
    ngOnInit() {
      this.userId = this.route.snapshot.paramMap.get('id_seller');
    }
  
    updateProfile() {
      const updatedProfile = {
        name: this.newName,
        email: this.newEmail,
        password: this.newPassword
      };
  
      this.http.put<any>(`http://localhost:5000/API/update_profile/${this.userId}`, updatedProfile)
        .subscribe(
          response => {
            console.log(response);
            // Gérer la réponse en fonction de vos besoins
          },
          error => {
            console.error('Error updating profile:', error);
            // Gérer l'erreur en fonction de vos besoins
          }
        );
    }

}
