import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { map } from "rxjs/operators";
@Component({
  selector: 'app-acess',
  templateUrl: './acess.component.html',
  styleUrls: ['./acess.component.css'],
  providers: [ApiService]
})
export class AcessComponent implements OnInit {
  public token: any
  constructor(private api: ApiService) { }

  ngOnInit() {

  }
  requisicao() {
    this.api.login('3s1000','admin', '12345')
      .subscribe(
        data => {
        console.log(JSON.stringify(data))
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
      stock => console.log(stock)
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
