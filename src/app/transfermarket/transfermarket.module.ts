import { TransfermarketNameFilter } from './../services/transfermarket.pipe';
import { TransfermarketService } from './../services/transfermarket.service';
import { PlayerService } from './../services/player.service';
import { BidinfoService } from './../services/bidinfo.service';
import { AlertService } from './../services/alert.service';
import { TeamService } from './../services/team.service';
import { LeagueService } from './../services/league.service';
import { ProgressBarComponent } from './transfermarket-panel/progress-bar/progress-bar.component';
import { TransfermarketPanelComponent } from './transfermarket-panel/transfermarket-panel.component';
import { TransfermarketAttributesComponent } from './transfermarket-attributes/transfermarket-attributes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule,  MatNativeDateModule, MatTableModule} from '@angular/material';
import { TeamModule } from './../team/team.module';
import { BidinfoModule } from './../bidinfo/bidinfo.module';
import { RouterModule } from '@angular/router';
import { TransfermarketFilterComponent } from './transfermarket-filter/transfermarket-filter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TdLoadingService } from '@covalent/core';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {SliderModule} from 'primeng/slider';
import {DataListModule} from 'primeng/datalist';




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
  CovalentChipsModule 
} from '@covalent/core';
import {
  MatAutocompleteModule,  
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatButtonModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatExpansionPanel,
  MatExpansionModule,
  
  
  
} from '@angular/material';
import { AttributesItemComponent } from './transfermarket-panel/attributes-item/attributes-item.component';
import { AttributeComponent } from './transfermarket-panel/attribute/attribute.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
		BidinfoModule,
		TeamModule,
		MatOptionModule,
		MatSelectModule,		
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatTableModule,
		NgxPaginationModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
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
    CovalentChipsModule,
    MatExpansionModule,
    MatProgressBarModule,
    NgxChartsModule,
    SliderModule,
    DataListModule
    
    
  ],
  entryComponents:[
    TransfermarketAttributesComponent
  ],
  declarations: [
    TransfermarketFilterComponent, 
    TransfermarketNameFilter,
    TransfermarketAttributesComponent,
    TransfermarketPanelComponent,
    AttributesItemComponent,
    ProgressBarComponent,
    AttributeComponent,
  ],
  providers: [
    TransfermarketService, 
    PlayerService, 
    BidinfoService, 
    AlertService, 
    TeamService,
    LeagueService,
    TdLoadingService
  ]
  
})
export class TransfermarketModule { }
