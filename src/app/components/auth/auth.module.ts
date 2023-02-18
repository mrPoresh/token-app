import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedMaterialModule } from 'src/app/modules/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    //LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
