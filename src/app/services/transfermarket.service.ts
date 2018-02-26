import { PlayerFilter } from './../model/playerFilter.model';
import { Transfermarket } from './../model/transfermarket.model';
import { HttpUtilService } from './http-util.service';
import { Player } from './../model/player.model';
import { BidinfoService } from './bidinfo.service';
import { PlayerService } from './player.service';
import { TeamService } from './team.service';
import { User } from './../model/user.model';
import { Team } from './../model/team.model';
import { Bidinfo } from './../model/bidinfo.model';
import { PlayerAttributes } from './../model/playerAttributes.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Rest } from 'app/model/rest.model';


@Injectable()
export class TransfermarketService {


  public players: Array<Player>;
  public msgErro: string;
  public bidinfoService: BidinfoService;
  public playerService: PlayerService;
  public teamService: TeamService;
  public user: User;
  public team: Team;
  public bidInfo: Bidinfo;
  public playerRest: Rest;


  constructor(_bidinfoService: BidinfoService,
    _playerService: PlayerService,
    _teamService: TeamService,
    public http: Http,
    public httpUtil: HttpUtilService) {
    this.bidinfoService = _bidinfoService;
    this.playerService = _playerService;
    this.teamService = _teamService;
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.team = JSON.parse(sessionStorage.getItem('team'));
  }

  bid(rating: number): number {

    let bidvalue = 0;

    if (rating >= 90) {
      bidvalue = 5000;
    } else if (rating >= 86) {
      bidvalue = 2500;
    } else if (rating >= 81) {
      bidvalue = 1500;
    } else if (rating >= 76) {
      bidvalue = 600;
    } else if (rating >= 71) {
      bidvalue = 500;
    } else if (rating >= 61) {
      bidvalue = 300;
    } else {
      bidvalue = 200;
    }
    return bidvalue;
  }


  listarFilterObservableRest(playerFilter: PlayerFilter, page: number): Observable<Rest> {
    return Observable.of(this.listarFilter2(playerFilter, page));
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  carregarPlayerRest(playerFilter: PlayerFilter, page: number) {
    let params = JSON.parse(JSON.stringify(playerFilter || null));
    this.http.post(this.httpUtil.url('player/getPlayers?page=' + page), params)
      .toPromise().then(response => {
        return JSON.stringify(response.json()) as Rest;
      }).catch(this.handleError).then(playerParam => {
        this.playerRest = playerParam;
      }).catch(this.handleError);
    
  }

  carregarTime(id: number) {

  }


  listarFilter2(playerFilter: PlayerFilter, page: number): Promise<Rest> {
    return new Promise((resolve, reject) => {
      let playerList: Player[] = [];
      let shops: Transfermarket[] = [];
      let rest = new Rest();
      
      this.playerService.listarFiltroRest(playerFilter, page)
        .subscribe((players) => {
          this.players = players.content;
          
          rest.first = players.first;
          rest.last = players.last;
          rest.number = players.number;
          rest.numberOfElements = players.numberOfElements;
          rest.size = players.size;
          rest.sort = players.sort;
          rest.totalElements = players.totalElements;
          rest.totalPages = players.totalPages;

          let array: Array<any> = [];      

          let arrayDePromises: Array<Promise<any>> = [];
          arrayDePromises.push(new Promise((resolve, reject) => {
            this.http.get(this.httpUtil.url('team/getByUser/' + this.team.id)).toPromise().then(response => {
              return response.json() as Team;
            }).catch(this.handleError).then(timesParam => {
              this.team = timesParam;
              resolve();              
            }).catch(this.handleError);
          }));
         
          this.players.map(player => {
            let shop = new Transfermarket();
            console.log(player);
            shop.name = player.name;
            shop.player = player;
            shop.clubName = player.clubName;
            shop.position = player.position;
            shop.rating = player.rating;
            shop.idPlayer = player.id;
            shop.team = this.team;
            shop.attributes = player.attributes;
            shop.icon = "fa fa-chevron-down";                    
            if (player.bid.status === "UNSET") {
              shop.idBid = 0;
              shop.bidValue = player.bid.originalValue;
              shop.originalValue = player.bid.originalValue;
              shop.teamId = player.bid.team;
              shop.hasBid = false;
              shop.bidAproved = false;
              
            } else {
              shop.idBid = player.bid.id;
              shop.bidValue = player.bid.nextValue;
              shop.originalValue = player.bid.originalValue;
              shop.teamId = player.bid.team;
              shop.hasBid = true;
              shop.bidAproved = (this.team.id === player.bid.team);
            }
            player.bid.bidValue = shop.bidValue;
            player.bid.team = this.team.id;
            console.log(shop);
            array.push(shop);             
          });
          

          Promise.all(arrayDePromises).then(() => {
            shops = array;
            rest.content = shops;
            resolve(rest);
          });
        },

        error => this.msgErro = error);
    });
  }

  getTeam() {
    return this.team;
  }


  buscarPorPlayerId(id: number): Observable<Bidinfo> {
    let bidinfoPath = 'market/getBidFromPlayerId';
    return Observable.create(observer => {
      this.http.get(this.httpUtil.url(bidinfoPath + '/' + id),
        this.httpUtil.headers())
        .map(this.httpUtil.extrairDados)
        .catch(this.httpUtil.processarErros)
        .subscribe((data) => {
          this.bidInfo = data
          observer.next(this.bidInfo);
          observer.complete();
        });
    });
  }








}