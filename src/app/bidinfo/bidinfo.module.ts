import { PlayerService } from './../services/player.service';
import { BidinfoService } from './../services/bidinfo.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule, MatSelectModule,  MatNativeDateModule, MatTableModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BidinfoListComponent } from './bidinfo-list/bidinfo-list.component';
import {MatProgressSpinnerModule} from '@angular/material';

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
    RouterModule,
		MatOptionModule,
		MatSelectModule,
		MatButtonModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatTableModule,
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
    BidinfoListComponent
  ],
  	providers: [
		BidinfoService,
    TdLoadingService,
    PlayerService

	]
})
export class BidinfoModule { } 
