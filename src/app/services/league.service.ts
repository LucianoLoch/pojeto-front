import { HttpUtilService } from './http-util.service';
import { League } from './../model/league.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class LeagueService {

    public path = 'league/list';
    public msgErro: string;
    public leagues: League[];

    constructor(public http: Http, public httpUtil: HttpUtilService) {
    }

    listarTodos(): Observable<League[]> {
        return this.http.get(this.httpUtil.url(this.path), this.httpUtil.headers())
            .map(this.httpUtil.extrairDadosContent)
            .catch(this.httpUtil.processarErros);
    }   

    buscarPorId(id: number): Observable<League> {
        return this.http.get(this.httpUtil.url(this.path + '/' + id),
            this.httpUtil.headers())
            .map(this.httpUtil.extrairDados)
            .catch(this.httpUtil.processarErros);
    }  

}