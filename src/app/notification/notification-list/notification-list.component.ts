import { Notification, NotificationrRest} from './../../model/notification.model';
import { Team } from './../../model/team.model';
import { User } from './../../model/user.model';
import { Player } from './../../model/player.model';
import { TeamService } from './../../services/team.service';
import { BidinfoService } from './../../services/bidinfo.service';
import { PlayerService } from './../../services/player.service';
import { Bidinfo } from './../../model/bidinfo.model';
import { NotificationService } from './../../services/notification.service';
import { AlertService } from './../../services/alert.service';

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { TdDataTableService, 
         TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, 
         ITdDataTableColumn,
         IPageChangeEvent,
         TdLoadingService } from '@covalent/core';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})

export class NotificationListComponent implements OnInit {

  @Input() team: Team;
  public notifications : Notification[];
  public msgErro: String;

  public columns: ITdDataTableColumn[] = [

    { name: 'id',  label: '#', hidden: true},
    { name: 'playerName',  label: 'Jogador', filter: true},
    { name: 'notification', label: 'Notificação', filter: true },
    { name: 'read', label: 'Marcar como Lida', filter: true },
    
  ];
  public data: Notification[] = [];
  public filteredData: any[] = this.data;
  public filteredTotal: number = this.data.length;
  public searchTerm: string = '';
  public selectedRows: any[] = [];
  public fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 20;
  public notificationRest: NotificationrRest = {};
  
  constructor(public notificationService :NotificationService,
              public alertService: AlertService,
              public _loadingService: TdLoadingService,
              public _dataTableService: TdDataTableService){    
  }

  ngOnInit() {
    this.team = JSON.parse(sessionStorage.getItem('team'));
    this.getNotifications();


  }

  getNotifications(){
    this._loadingService.register('overlayStarSyntax');
    this.notificationService.buscarPorId(this.team.id,this.currentPage-1)
      .subscribe((notifications) => {
        this.notificationRest = notifications;
        this.data = this.notificationRest.content;        
        this._loadingService.resolve('overlayStarSyntax');
        this.filter();
      }, error => this.msgErro = error);   
  }

  isRead(id: number){
    console.log(id);
    this.notificationService.isRead(id)
      .subscribe((data) => {
        this.alertService.success("Notificação atualizada com sucesso");
        this.getNotifications();
      });

  }
  filter(): void {
    let newData: any[] = this.data;
    
    newData = this._dataTableService.filterData(newData, this.searchTerm, true);
    this.filteredTotal = newData.length;
    this.filteredData = newData;
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.getNotifications();
  }

  onRefresh() {
    this.getNotifications();
  }

  isReadAll(id: number){
    console.log(id);
    this.notificationService.isReadAll(id)
      .subscribe((data) => {
        this.alertService.success("Notificações atualizadas com sucesso.");
        this.getNotifications();
      });

  }

 
}
