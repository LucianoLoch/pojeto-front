import { AuthGuards } from './services/auth-guards';
import { AdminComponent } from './dashboard/admin/admin.component';
import { NotificationRoutes } from './notification/notification-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransfermarketRoutes } from './transfermarket/transfermarket-routing.module';
import { TeamRoutes } from './team/team-routing.module';
import { BidinfoRoutes } from './bidinfo/bidinfo-routing.module';
import { TeamViewComponent } from './team/team-view/team-view.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserLoginComponent } from './user/user-login/user-login.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  ...TeamRoutes,
  ...BidinfoRoutes,
  ...TransfermarketRoutes,
  ...NotificationRoutes,
  { path: 'dashboard', component: DashboardComponent, canActivate : [AuthGuards]},
  { path: 'admin', component: AdminComponent, canActivate : [AuthGuards]},  
  { path: '', component: DashboardComponent, canActivate: [AuthGuards]},
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserCreateComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}