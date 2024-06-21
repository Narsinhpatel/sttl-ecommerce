import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  constructor(private http:HttpClient,private cookieService: CookieService,private router: Router) { }
// fetch data from api
  register(userData: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/v1/users/register', userData);
  }
  login(credentials: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/v1/users/login', credentials,this.options);
  }
  logout(): Observable<any> {

    return this.http.post('http://localhost:3000/api/v1/users/logout',{},this.options);
   
  }
  isAuthenticated(): boolean {
    const token = this.cookieService.get('accessToken');

    console.log("cookie"+token)
    return !!token; // Returns true if token exists
  }
}
