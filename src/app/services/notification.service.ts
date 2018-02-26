import { Notification, NotificationrRest } from './../model/notification.model';
import { HttpUtilService } from './http-util.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class NotificationService {

    public path = 'notification/getByTeam';
    public msgErro: string;
    public notifications: Notification[];

    constructor(public http: Http, public httpUtil: HttpUtilService) {
    }

    listarTodos(): Observable<Notification[]> {
        return this.http.get(this.httpUtil.url(this.path), this.httpUtil.headers())
            .map(this.httpUtil.extrairDadosContent)
            .catch(this.httpUtil.processarErros);
    }   

    buscarPorId(id: number, page: number): Observable<NotificationrRest> {
        return this.http.get(this.httpUtil.url(this.path + '/' + id + '?page='+page),
            this.httpUtil.headers())
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }  

    getLastNotifications(id: number): Observable<NotificationrRest> {
        return this.http.get(this.httpUtil.url('notification/getLasts/' + id),
            this.httpUtil.headers())
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    } 

    isRead(id: number): Observable<Notification>{
        return this.http.get(this.httpUtil.url('notification/markAsRead/' + id),
            this.httpUtil.headers())
            .map(this.httpUtil.extrairDadosContent)
            .catch(this.httpUtil.processarErros);
    } 

    isReadAll(id: number): Observable<Notification>{
        return this.http.get(this.httpUtil.url('notification/markAllAsRead/' + id),
            this.httpUtil.headers())
            .map(this.httpUtil.extrairDadosContent)
            .catch(this.httpUtil.processarErros);
    } 


    

}