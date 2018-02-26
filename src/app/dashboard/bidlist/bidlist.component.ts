import { Team } from './../../model/team.model';
import { User } from './../../model/user.model';
import { Player } from './../../model/player.model';
import { TeamService } from './../../services/team.service';
import { BidinfoService } from './../../services/bidinfo.service';
import { PlayerService } from './../../services/player.service';
import { Bidinfo } from './../../model/bidinfo.model';

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-bidlist',
  templateUrl: './bidlist.component.html',
  styleUrls: ['./bidlist.component.css']
})

export class BidlistComponent implements OnInit {

  public players: Player[];
  public idExcluir: number;
  public pagina: number;
  public totalRegistros: number;
  public msgErro: string;
  public user: User;
  public player: Player;
  loading: boolean = true;
  color = 'primary';
  mode = 'indeterminate';
  @Input() team: Team;
  public lengthBid: number;


  constructor(public teamService: TeamService,
    public playerService: PlayerService,
    public route: ActivatedRoute) {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
  }



  ngOnInit() {
    this.loading = true;
    this.teamService.buscarPorIdUser(this.user.id)
      .subscribe((team) => {
        this.team = team
        this.players = this.team.players;       
      }, error => this.msgErro = error);

  }
}
