import { TeamService } from './../../../services/team.service';
import { Team } from './../../../model/team.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.css']
})
export class ListTeamComponent implements OnInit {

  public teams : Array<Team> = [];
  public msgErro: string;
  public teamsValue: number = 0;

  constructor(public teamService : TeamService) { }

  ngOnInit() {
    this.teamService.listarTodos()
    .subscribe((teams) => {
      this.teams = teams
      this.getTeamsValue();
    }, error => this.msgErro = error);
  }

  getTeamsValue(){
    for (let team of this.teams){
      this.teamsValue = this.teamsValue + team.budget;
    }
  }

}
