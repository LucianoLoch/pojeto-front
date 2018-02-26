import { AuthGuards } from './../services/auth-guards';
import { TransfermarketPanelComponent } from './transfermarket-panel/transfermarket-panel.component';
import { TransfermarketFilterComponent } from './transfermarket-filter/transfermarket-filter.component';

import { Routes } from '@angular/router'; 


export const TransfermarketRoutes: Routes = [
	{ path: 'transfermarket/panel', component: TransfermarketPanelComponent, canActivate: [AuthGuards] },
	{ path: 'transfermarket', component: TransfermarketFilterComponent, canActivate: [AuthGuards] },
];
