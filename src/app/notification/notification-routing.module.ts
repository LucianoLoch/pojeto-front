import { AuthGuards } from './../services/auth-guards';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { Routes } from '@angular/router'; 


export const NotificationRoutes: Routes = [
	{ path: 'notification/list', component: NotificationListComponent, canActivate: [AuthGuards] }, 
];