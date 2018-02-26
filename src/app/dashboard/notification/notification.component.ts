import { Team } from './../../model/team.model';
import { User } from './../../model/user.model';
import { Player } from './../../model/player.model';
import { TeamService } from './../../services/team.service';
import { BidinfoService } from './../../services/bidinfo.service';
import { PlayerService } from './../../services/player.service';
import { Bidinfo } from './../../model/bidinfo.model';
import { Notification } from './../../model/notification.model';
import { NotificationService } from './../../services/notification.service';


import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {

  @Input() team: Team;
  public notifications : Notification[];
  public msgErro: String;
  public lengthNotification: number;
  

  constructor(public notificationService :NotificationService){    
  }

  ngOnInit() {
    this.team = JSON.parse(sessionStorage.getItem('team'));
    this.notificationService.getLastNotifications(this.team.id)
      .subscribe((notifications) => {
        this.notifications = notifications.content;
        this.lengthNotification = notifications.totalElements;
      }, error => this.msgErro = error);   

  }
}
