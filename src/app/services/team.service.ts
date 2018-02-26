import { HttpUtilService } from './http-util.service';
import { Team } from './../model/team.model';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class TeamService {

  public teams: Team[];

  public path = 'team';

  constructor(public http: Http, public httpUtil: HttpUtilService) {
  }


  listarTodos(): Observable<Team[]> {

    return this.http.get(this.httpUtil.url(this.path + '/list'), this.httpUtil.headers())
      .map(this.httpUtil.extrairDadosContent)
      .catch(this.httpUtil.processarErros);
  }


  register(team: Team): Observable<Team> {
    return this.http.post(this.httpUtil.url(this.path + '/register'), team,
      this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);

  }

  update(team: Team) {
    let params = JSON.stringify(team);

    return this.http.put(this.httpUtil.url(this.path + '/update'), params,
      this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }


  buscarPorIdUser(id: number): Observable<Team> {   
    let teamPath = this.path + '/getByUser';
    return this.http.get(this.httpUtil.url(teamPath + '/' + id), this.httpUtil.headers())
      .map(this.httpUtil.extrairDados)
      .catch(this.httpUtil.processarErros);
  }



}
