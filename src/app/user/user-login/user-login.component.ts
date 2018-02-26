import { User } from './../../model/user.model';
import { AuthenticationService } from './../../services/authentication.service';
import { AlertService } from './../../services/alert.service';
import { TeamService } from './../../services/team.service';
import { Team } from './../../model/team.model';
import { ActivatedRoute, Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

    model: User;
    loading = false;
    returnUrl: string;

    public usuario: string;
    public senha: string;
    public msgErro: string;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public authenticationService: AuthenticationService,
        public alertService: AlertService,
        public teamService: TeamService) { }

    ngOnInit() {
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.authenticationService.logout();
        let user = new User();
        user.username = this.usuario;
        user.password = this.senha;
        user.id = 1;        
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/dashboard']);
        window.location.reload();
        /*this.authenticationService.login(user)
            .subscribe((user) => {
                let team: Team;
                let userLogged = user;
                if (userLogged) {
                    this.alertService.success('Usuário Logado com Sucesso');*/
                    
       /*             

                } else {
                    this.alertService.error('Usuário inválido ou senha incorreta.');
                    this.router.navigate(['/login']);
                }

            },
            error => this.alertService.error(error));*/
    }


    processarLogin(user: User) {
        if (user) {
            this.alertService.success('Usuário Logado com Sucesso');
            this.router.navigate(['/dashboard']);
        } else {
            this.alertService.error('Usuário inválido ou senha incorreta.');
            this.router.navigate(['/login']);
        }
    }

}