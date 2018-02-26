import { PlayerFilter } from './../../model/playerFilter.model';
import { Transfermarket } from './../../model/transfermarket.model';
import { Player } from './../../model/player.model';
import { League } from './../../model/league.model';
import { TransfermarketService } from './../../services/transfermarket.service';
import { PlayerService } from './../../services/player.service';
import { AlertService } from './../../services/alert.service';
import { LeagueService } from './../../services/league.service';
import { PlayerAttributes } from './../../model/playerAttributes.model';
import { OnInit, Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-transfermarket-filter',
  templateUrl: './transfermarket-filter.component.html',
  styleUrls: ['./transfermarket-filter.component.css']
})
export class TransfermarketFilterComponent implements OnInit {

  public transfermarket: Transfermarket;
  public players: Array<Player> = [];
  public leagues: Array<League> = [];
  public playerFilter: PlayerFilter = new PlayerFilter();
  public playerAttributes = [
    { "name": 'Defending', "icon": "fa fa-star", attribute: 'DEF', 'value': 0 },
    { "name": 'Dribbling', "icon": "fa fa-star", attribute: 'DRI', "value": 0 }, 
    { "name": 'Pace', "icon": "fa fa-star", attribute: 'PAC', "value": 0 },
    { "name": 'Passing', "icon": "fa fa-star", attribute: 'PAS', "value": 0 },
    { "name": 'Physical', "icon": "fa fa-star", attribute: 'PHY', "value": 0 },
    { "name": 'Shooting', "icon": "fa fa-star", attribute: 'SHO', "value": 0 }
  ];
  public gkAttributes = [
    { "name": 'Kicking', "icon": "fa fa-star", attribute: 'KIC', "value": 0 },
    { "name": 'Speed ', "icon": "fa fa-star", attribute: 'SPD', "value": 0 },
    { "name": 'Handling', "icon": "fa fa-star", attribute: 'HAN', "value": 0 },
    { "name": 'Positioning', "icon": "fa fa-star", attribute: 'POS', "value": 0 },
    { "name": 'Reflexes', "icon": "fa fa-star", attribute: 'REF', "value": 0 },
    { "name": 'Diving', "icon": "fa fa-star", attribute: 'DIV', "value": 0 }

  ]
  public leagueName: String = '';
  public value: any = {};
  selectedValue: string; 
  public rangeValues: number[] = [0,99];
  public startPrice: number = 0;
  public endPrice: number = 0;
  public rating: number = 0;
  public ratingend: number = 0;

  playerCtrl: FormControl;
  filteredPlayers: any;

  positionsCtrl: FormControl;
  filteredPositions: any;

  leaguesCtrl: FormControl;
  filteredLeagues: any;
  positions = ['GK', 'RB', 'RWB', 'CB', 'LB', 'LWB', 'RM', 'RW', 'CDM', 'CM', 'CAM', 'LM', 'LW', 'CF','ST'];
  
  filteredObjects: PlayerAttributes[];
  objects: Array<PlayerAttributes> = [
    {id: 1,name:'Nome', value: 0},
    {id: 2,name:'Posição', value: 1},
    {id: 3,name:'Rating', value: 2},
    {id: 4,name:'Tem Lance', value: 3}    
  ];

  objectsModel: PlayerAttributes[] = this.objects.slice(0,2);

  constructor(
    public router: Router,
    public transfermarketService: TransfermarketService,
    public playerService: PlayerService,
    public leagueService: LeagueService,
    public alertService: AlertService) {

    this.playerCtrl = new FormControl();
    this.filteredPlayers = this.playerCtrl.valueChanges
      .startWith(null)
      .map(player => this.filterPlayers(player));

    this.positionsCtrl = new FormControl();
    this.filteredPositions = this.positionsCtrl.valueChanges
      .startWith(null)
      .map(position => this.filterPositions(position));

    this.leaguesCtrl = new FormControl();
    this.filteredLeagues = this.leaguesCtrl.valueChanges
      .startWith(null)
      .map(leagues => this.filterLeagues(leagues));


  }

  ngOnInit() {
    this.transfermarket = new Transfermarket();
    this.playerService.listarTodos()
      .subscribe((players) => {
        this.players = players;
      });
    this.leagueService.listarTodos()
      .subscribe((leagues) => {
        this.leagues = leagues;
      });
    this.playerFilter.name = '';
    this.playerFilter.position = '';
    this.playerFilter.rating = 0;
    this.playerFilter.ratingend = 0;
    this.playerFilter.league = 0;
    this.playerFilter.ordenation = [];
    this.filterObjects('');
  }

  filterObjects(value: string): void {
    this.filteredObjects = this.objects.filter((obj: PlayerAttributes) => {
      if (value) {
        return obj.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
      } else {
        return false;
      }
    }).filter((filteredObj: any) => {
      return this.objectsModel ? this.objectsModel.indexOf(filteredObj) < 0 : true;
    });
  }

  filterPlayers(val: string) {
    return val ? this.players.filter(s => new RegExp(`^${val}`, 'gi').test(s.name))
      : this.players;
  }

  filterPositions(val: string) {
    return val ? this.positions.filter(s => new RegExp(`^${val}`, 'gi').test(s))
      : this.positions;
  }

  filterLeagues(val: string) {
    return val ? this.leagues.filter(s => new RegExp(`^${val}`, 'gi').test(s.name))
      : this.leagues;
  }

  onInputStartPrice(event: any) {
    this.playerFilter.startValue = event;
  }

  onInputEndPrice(event: any) {
    this.playerFilter.endValue = event;
  }

  onInputRating(e) {
    this.playerFilter.rating = this.rangeValues[0];
    this.playerFilter.ratingend = this.rangeValues[1];
  }



  checkAttributes(): boolean{
    if ((this.playerAttributes[0].value === 0) &&
        (this.playerAttributes[1].value === 0) &&
        (this.playerAttributes[2].value === 0) &&
        (this.playerAttributes[3].value === 0) &&
        (this.playerAttributes[4].value === 0) &&
        (this.playerAttributes[5].value === 0) &&
        (this.gkAttributes[0].value === 0) &&
        (this.gkAttributes[1].value === 0) &&
        (this.gkAttributes[2].value === 0) &&
        (this.gkAttributes[3].value === 0) &&
        (this.gkAttributes[4].value === 0) &&
        (this.gkAttributes[5].value === 0)){
      return false;
    }
    return true;
  }

  check(filter: PlayerFilter): boolean {

    if ((filter.name.length === 0) &&
      (filter.position.length === 0) &&
      (filter.rating === 0) &&
      (filter.ratingend === 0) &&
      (filter.league === 0) &&
      (!this.checkAttributes)) {
      return false;
    }
    return true;
  }

  findIdLeague(): number {
    let league: League;
    league = this.leagues.filter(leagues => leagues.name === this.leagueName)[0];
    return league.originalId;
  }

  filter(filterPlayer: PlayerFilter): NavigationExtras {
    let navextras: NavigationExtras = {
      queryParams: { "playerFilter": JSON.stringify(filterPlayer) }
    };
    return navextras;

  }

  getOrder(): Array<number>{
    let order = new Array<number>();
    for (var index = this.objectsModel.length-1; index >= 0; index--) {
      order.push(this.objectsModel[index].value);
    }

    return order;


  }

  getAttributes(filter: PlayerFilter): PlayerFilter {
    let attributes: Array<PlayerAttributes> = [];
    for (var index = 0; index < this.playerAttributes.length; index++) {
      if (this.playerAttributes[index].value != 0){
        attributes.push(new PlayerAttributes(0,this.playerAttributes[index].attribute, this.playerAttributes[index].value))
      }      
    }

    for (var index = 0; index < this.playerAttributes.length; index++) {
      if (this.gkAttributes[index].value != 0){
        attributes.push(new PlayerAttributes(0,this.gkAttributes[index].attribute, this.gkAttributes[index].value))
      }      
    }
    filter.attributes = attributes;
    return filter;
    
  }


  onFilter(filterPlayer: PlayerFilter) {
    this.getAttributes(filterPlayer);
    filterPlayer.ordenation = this.getOrder();
    console.log(filterPlayer);
    if (this.leagueName.length > 0) {
      filterPlayer.league = this.findIdLeague();
    }

    if (this.check(filterPlayer)) {
      this.router.navigate(['/transfermarket/panel'], this.filter(filterPlayer));
    } else {
      this.alertService.error('Informe pelo menos um filtro!');
    }
  }
}