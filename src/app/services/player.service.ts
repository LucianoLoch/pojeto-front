import { HttpUtilService } from './http-util.service';

import { PlayerFilter } from './../model/playerFilter.model';

import { Player } from './../model/player.model';

import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Rest } from 'app/model/rest.model';



@Injectable()
export class PlayerService {

  public path = 'player/list';

  public msgErro: string;
  public players: Player[];

  constructor(public http: Http, public httpUtil: HttpUtilService) {
  }

  listarTodos(): Observable<Player[]> {
    return this.http.get(this.httpUtil.url(this.path), this.httpUtil.headers())
      .map(this.httpUtil.extrairDadosContent)
      .catch(this.httpUtil.processarErros);
  }

  listarFiltro(playerFilter: PlayerFilter, page: number): Observable<Player[]> {
    let params = JSON.parse(JSON.stringify(playerFilter || null));
    return this.http.post(this.httpUtil.url('player/getPlayers?page='+page), params,
      this.httpUtil.headers())
      .map(this.httpUtil.extrairDadosContent)
      .catch(this.httpUtil.processarErros);
  }

  listarFiltroRest(playerFilter: PlayerFilter, page: number): Observable<Rest> {
    let params = JSON.parse(JSON.stringify(playerFilter || null));
    return this.http.post(this.httpUtil.url('player/getPlayers?page='+page), params,
      this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  listarPlayers(playerFilter: PlayerFilter, page: number): Promise<Rest>{
    let params = JSON.parse(JSON.stringify(playerFilter || null));
    return this.http.post(this.httpUtil.url('player/getPlayers?page='+page), params)
      .toPromise()
      .then(response => response.json().data as Rest)
      .catch(this.handleError);
    
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
}  


  buscarPorId(id: number): Observable<Player> {
    return this.http.get(this.httpUtil.url('player/getPlayer/' + id),
      this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }

  


}
