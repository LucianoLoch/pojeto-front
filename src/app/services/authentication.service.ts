import { HttpUtilService } from './http-util.service';
import { User } from './../model/user.model';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

    public path = 'http://localhost:8585/pofexo/rest/user/login';

    public loginUrl: string = 'user/login';
    public logoutUrl: string = '';

    constructor(public http: Http, public httpUtil: HttpUtilService) { }


    login(user: User) {
        return this.http.post(this.httpUtil.url(this.loginUrl), user,
            this.httpUtil.headers())
            .map(this.httpUtil.extrairDadosUser)
            .catch(this.httpUtil.processarErros);
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('team');
    }

    listarTodos(): Observable<User[]> {
        return this.http.get(this.httpUtil.url('user/list'), this.httpUtil.headers())
            .map(this.httpUtil.extrairDadosContent)
            .catch(this.httpUtil.processarErros);
    }

    isLogged() {
        return sessionStorage['token'];
    }

}
