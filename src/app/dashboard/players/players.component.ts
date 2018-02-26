import { TeamService } from './../../services/team.service';
import { Player } from './../../model/player.model';
import { User } from './../../model/user.model';
import { Team } from './../../model/team.model';
import { FormsModule } from '@angular/forms';


import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {
  @Input() players: Player[];


  getRatingColor(attribute: number){
    if (attribute >= 75){
      return 'rating-75-99'
    } else if (attribute >= 65) {
      return 'rating-65-74'
    } else if (attribute < 65) {
      return 'rating-1-64'
    } 
  }
}
