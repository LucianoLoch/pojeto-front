import { Team } from './../../model/team.model';
import { User } from './../../model/user.model';
import { Player } from './../../model/player.model';
import { TeamService } from './../../services/team.service';


import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent  {

   @Input() team: Team;
}
