import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { NbPasswordAuthStrategy, NbAuthModule } from "@nebular/auth";


import { AppComponent } from './app.component';
import { AcessComponent } from './acess/acess.component';

@NgModule({
  declarations: [
    AppComponent,
    AcessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'https://s3sistema.herokuapp.com',
          login: {
            endpoint: '/auth/token',
            method: 'post'
          }
        }),
      ],
      forms: {},
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
