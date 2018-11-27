import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded',
    'Authorization': 'Bearer 866fd5ccbc10175d7f9043b8ac81a9ab2004c6e6c07538983e31165b0d20591a'
  })
};
@Injectable()
export class ApiService {
public access_token: string;
private URL = 'https://s3sistema.herokuapp.com'

  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.access_token = currentUser && currentUser.access_token
  }
   
   login(scope:string, username: string, password: string): Observable<any> {
     let body = 'grant_type=password' + '&scope=' + scope + '&username=' + username + '&password=' + password;

     return this.http.post<any>(`${this.URL}/oauth/token`,body, httpOptions)
     .pipe(
       map( user => {
        if (user && user.access_token) {
          sessionStorage.setItem('currentUser', JSON.stringify(user))
        }
        return user;
       })
     )
   }

   getList(): Observable<any> {
    return this.http.post<any>(`${this.URL}/control/createstock`,{"name":"TESTENADOPOST"},httpOptions)
   }
   
   getStock() {
     return this.http.get(`${this.URL}/control/liststock`,httpOptions)
   }

   deletStock() {
     return this.http.delete(`${this.URL}/control/deletecategoryfinc`,httpOptions)
   }
   logout(): void {
     this.access_token = null
     sessionStorage.removeItem('currentUser')
   }
}
