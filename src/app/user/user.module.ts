import { AuthenticationService } from './../services/authentication.service';
import { TeamService } from './../services/team.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {  MatOptionModule, MatSelectModule, MatNativeDateModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
		
		MatOptionModule,
		MatSelectModule,
		
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UserCreateComponent, 
    UserLoginComponent
  ],
  providers: [
		AuthenticationService,
    TeamService
	]
})
export class UserModule { }
