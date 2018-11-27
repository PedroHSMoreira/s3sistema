import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, shareReplay } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded',
    'Authorization': 'Bearer 0977141a92cf7ace598cae66f87f7360b7a26ed026e1d61a528f2a3513ac8cea'
  })
};
@Injectable()
export class ApiService {
public access_token: string;
private URL = 'https://s3sistema.herokuapp.com'

  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
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
      // tap(res => sessionStorage.setItem('access_token',JSON.stringify(res)))
      )
    }   
    
    getList(): Observable<any> {
      return this.http.post<any>(`${this.URL}/control/createfinance`,{"name":"Lucas"},httpOptions)
   }
   
   getStock() {
     return this.http.get(`${this.URL}/control/listfinance`,httpOptions)
   }

   deletStock() {
     return this.http.delete(`${this.URL}/control/deletecategoryfinc`,httpOptions)
   }
   logout(): void {
     this.access_token = null
     sessionStorage.removeItem('currentUser')
   }
}
