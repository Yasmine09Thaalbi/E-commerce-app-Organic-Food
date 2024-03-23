import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {  
  }
  private serverAddress = 'http://localhost:5000/API';

  signup_post_request(formData: FormData) {
    return this.http.post(
      `${this.serverAddress}/signup`,formData
    );
  }
  
  login_get_request(email: string, password: string) {
    const params = new HttpParams()
    .set('email', email)
    .set('password', password);
    return this.http.get(`${this.serverAddress}/login`, { params });
  }

}
