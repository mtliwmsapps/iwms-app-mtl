import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login';
import { LoginPageRoutingModule } from './login-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpModule } from '@angular/http';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    HttpModule,
    TranslateModule
  ],
  declarations: [
    LoginPage,
  ]
})
export class LoginModule { }
