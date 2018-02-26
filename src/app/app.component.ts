import { UserService } from './services/user.service';
import { TeamService } from './services/team.service';
import { User } from './model/user.model';
import { Team } from './model/team.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pojeto-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    team : Team;
    public msgErro : string;
 
    constructor(public userService: UserService, 
                public teamService : TeamService,
                public router: Router) {
        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

        if (this.currentUser){
            this.teamService.buscarPorIdUser(this.currentUser.id)
                .subscribe((team) => { 
                    this.team = team;
                    console.log(team);
                    if(!this.team){
                        this.router.navigate(['/team/create']);
                    }
                },                
                error => this.msgErro = error);                
        }
    }
 
    ngOnInit() {
        
    }
 


}
 