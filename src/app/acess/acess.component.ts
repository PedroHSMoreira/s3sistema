import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { map } from "rxjs/operators";
import { Key } from 'protractor';

@Component({
  selector: 'app-acess',
  templateUrl: './acess.component.html',
  styleUrls: ['./acess.component.css'],
  providers: [ApiService]
})
export class AcessComponent implements OnInit {
  constructor(private api: ApiService) { }

  public access_token: string
  ngOnInit() {

  }
  requisicao() {
    this.api.login('3s1000','admin', '12345')
      .subscribe(
        data => {
          const s = JSON.parse(sessionStorage.getItem('currentUser'))
          this.access_token = s.access_token
          console.log(this.access_token)
          console.log(data)
        }
      )
  }

  get() {
    this.api.getList()
    .subscribe (
      list => document.write(JSON.stringify(list))
    )
  }

  getStock(){
    this.api.getStock()
    .subscribe(
      stock => { 
        // for (let key in stock.data[0]) {
        //     console.log(stock.data[0][key])
        // }
        console.log(stock)
      }
    )
  }

  deleteStock(){
    this.api.deletStock()
    .subscribe(
      del => console.log(del)
    )
  }

  logout(){
    this.api.logout()
  }
  
}
