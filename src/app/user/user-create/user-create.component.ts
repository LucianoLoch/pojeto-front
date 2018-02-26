import { UserService } from './../../services/user.service';
import { AlertService } from './../../services/alert.service';
import { AuthenticationService } from './../../services/authentication.service';
import { User } from './../../model/user.model';
import { Team } from './../../model/team.model';
import { TeamService } from './../../services/team.service';
import { Result } from './../../model/result.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

    model: any = {
    };
    loading = false;
    public team = new Team();
    public user = new User();
    public arrayDePromises: Array<Promise<string>> = [];
    public result = new Result();

    constructor(
        public router: Router,
        public userService: UserService,
        public authenticationService: AuthenticationService,
        public teamService: TeamService,
        public alertService: AlertService) { }

    register() {
        //        this.loading = true;
        this.arrayDePromises.push(this.registerUser());
        Promise.all(this.arrayDePromises).then(() => { 
            console.log('entrou');           
            if (this.result.type === 'sucess'){
                this.alertService.success(this.result.result);
                this.router.navigateByUrl(this.result.redirecTo);
            } else {
                this.alertService.error(this.result.result);
                this.router.navigateByUrl(this.result.redirecTo);
            }
        });


    }

    ngOnInit() {
        this.team = new Team();
        this.team.budget = 15000;
        this.user = new User();
    }

    registerUser(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.userService.create(this.user)
                .subscribe(
                (res) => {
                    this.user = res;
                    //this.arrayDePromises.push(this.loginUser());      
                    this.arrayDePromises.push(this.registerTeam());              
                    this.result.result = 'Registro Efetuado com Sucesso';
                    this.result.type = "sucess";
                    this.result.redirecTo = "/dashboard";
                    console.log('registerUser');
                    console.log(this.result);
                    resolve();

                },
                (err) => {
                    this.alertService.error(err);
                    this.loading = false;
                });

        });
    }

    registerTeam(): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log(this.user);
            this.team.idUser = this.user.id;
            this.teamService.register(this.team)
                .subscribe((team) => {
                    this.team = team;
                    this.result.result = 'Time cadastrado com sucesso!';
                    this.result.type = "sucess"; 
                    this.result.redirecTo = "/dashboard";
                    console.log('registerTeam');
                    console.log(this.result);
                    resolve();
                });
        });
    }

    loginUser(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.authenticationService.login(this.user)
                .subscribe((user) => {                    
                    this.user = user;
                    
                    this.user = user;
                    if (this.user) {
                        this.result.result =  'Usuário Logado com Sucesso';
                        this.result.type = 'sucess';
                        this.result.redirecTo = '/dashboard'; 
                        console.log('loginUser');
                        console.log(this.result);                       
                        resolve();
                    }
                },
                error => {
                    this.result.result =  'Não foi possível realizar o login.';
                    this.result.type = 'error';
                    this.result.redirecTo = '/login';                    
                    resolve();

                });
        });
    }
}