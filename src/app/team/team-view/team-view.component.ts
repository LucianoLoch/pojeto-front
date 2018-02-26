import { TeamService } from './../../services/team.service';
import { Player } from './../../model/player.model';
import { User } from './../../model/user.model';
import { Team } from './../../model/team.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css'],
})
export class TeamViewComponent implements OnInit {

  public id: number;
  public teamResult: Team;
  public team: Team;
  public user: User;
  public msgErro: string;
  public players: Player[];
  loading: boolean = true;
  color = 'primary';
  mode = 'indeterminate';
	/**
	 * Construtor.
	 *
	 * @param ActivatedRoute route
	 * @param TeamService teamService
	 */
  constructor(
    public route: ActivatedRoute,
    public teamService: TeamService) {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));


  }

	/**
	 * Método executado logo após a criação do componente.
	 */
  ngOnInit() {
    this.loading = true;
    console.log(this.user);
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.id = +this.route.snapshot.params['id'];
    let idUser = 0;
    if (this.id === 0) {
      idUser = this.id;
    } else {
      idUser = this.user.id;
    }

    this.teamService.buscarPorIdUser(this.user.id)
      .subscribe((team) => {
        this.team = team;
        this.loading = false;
      },
      error => this.msgErro = error);



  }

}
