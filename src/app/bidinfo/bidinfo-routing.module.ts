import { AuthGuards } from './../services/auth-guards';
import { BidinfoListComponent } from './bidinfo-list/bidinfo-list.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

export const BidinfoRoutes: Routes = [
	{ path: 'bid', redirectTo: 'bid/list', canActivate: [AuthGuards]},
	{ path: 'bid/list', component: BidinfoListComponent, canActivate: [AuthGuards] }, 
];

