import { User } from './../model/user.model';
import { HttpUtilService } from './http-util.service';
import { Team } from './../model/team.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 

@Injectable()
export class UserService {

    constructor(public http: Http, public httpUtil :HttpUtilService) { }

	//public API_URL: string = 'http://localhost:8585/pofexo/rest/user';
    public API_URL: string = 'http://nbbnu006609:9191/user/';

    //http://nbbnu006609:9191/player/get/5
    public path = 'user';
 
    getAll() {
        return this.http.get(this.API_URL + '/todosUsuarios', this.jwt()).map((response: Response) => response.json());
    }
 
    getById(id: number) {
        return this.http.get(this.API_URL + '/get/' + id, this.jwt()).map((response: Response) => response.json());
    }
 
    create(user: User) : Observable<User> {
        let params = JSON.parse(JSON.stringify(user || null)); 
        return this.http.post(this.httpUtil.url(this.path + '/register'), params,
                        this.httpUtil.headers())
                    .map(this.httpUtil.extrairDados)
                    .catch(this.httpUtil.processarErros);    
    }
    
    

    update(user: User) {
        return this.http.put(this.API_URL + '/update/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }
 
    delete(id: number) {
        return this.http.delete(this.API_URL + '/excluir/' + id, this.jwt()).map((response: Response) => response.json());
    }
 
    // public helper methods
 
    public jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

}
