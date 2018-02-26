import { AuthGuards } from './../services/auth-guards';
import { TeamViewComponent } from './team-view/team-view.component';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { TeamCreateComponent } from './team-create/team-create.component';
import { TeamListComponent } from './team-list/team-list.component';
import { Routes } from '@angular/router'; 


export const TeamRoutes: Routes = [
	{ path: 'team/list', component: TeamListComponent, canActivate: [AuthGuards] }, 
	{ path: 'team/create', component: TeamCreateComponent, canActivate: [AuthGuards] }, 
	{ path: 'team/edit/:id', component: TeamEditComponent, canActivate: [AuthGuards]  },
	{ path: 'team/view/:id', component: TeamViewComponent, canActivate: [AuthGuards] },
	{ path: 'team/view', component: TeamViewComponent, canActivate: [AuthGuards] }
];