import { UserService } from './../services/user.service';
import { NotificationService } from './../services/notification.service';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule, MatSelectModule,  MatNativeDateModule, MatPaginatorModule, MatCheckboxModule, MatButtonModule } from '@angular/material';


import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material';

import {
  CovalentCommonModule,
  CovalentDataTableModule,
  CovalentFileModule,
  CovalentMediaModule,
  CovalentNotificationsModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentStepsModule,
  CovalentLoadingModule,
  CovalentExpansionPanelModule,
  CovalentChipsModule,
  TdLoadingService
} from '@covalent/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
		MatOptionModule,
		MatSelectModule,
		MatCheckboxModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,    
    CovalentMediaModule,
    CovalentFileModule,
    CovalentStepsModule,
    CovalentDataTableModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentCommonModule,
    CovalentLoadingModule,
    CovalentExpansionPanelModule,
    CovalentChipsModule 
  ],
  declarations: [
    NotificationListComponent
  
  ],
  	providers: [
		NotificationService, 
    UserService,
    TdLoadingService
	],
  
})
export class NotificationModule { }
