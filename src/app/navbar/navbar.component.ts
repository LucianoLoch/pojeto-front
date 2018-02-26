import { User } from './../model/user.model';
import { Team } from './../model/team.model';
import { TeamService } from './../services/team.service';
import { UserService } from './../services/user.service';
import { Notification } from './../model/notification.model';
import { NotificationService } from './../services/notification.service';
import { Component, OnInit, Input } from '@angular/core';
import { AnonymousSubscription } from "rxjs/Subscription";
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public msgErro : string;
  public timerSubscription: AnonymousSubscription;
  public timerTeamSubscription: AnonymousSubscription;
  public notificationSubscription: AnonymousSubscription;
  public teamSubscription: AnonymousSubscription;
  

  @Input() currentUser: User;
  @Input() team : Team;
  public notifications : Notification[];

  constructor(public notificationService :NotificationService,
              public teamService: TeamService){    
  }

  ngOnInit() {
    this.team = JSON.parse(sessionStorage.getItem('team'));
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (this.team){
      this.getTeam();
      this.refreshData();
    }    
  }

  public ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
        if (this.timerTeamSubscription) {
      this.timerTeamSubscription.unsubscribe();
    }

  }

  isReadAll(id: number){
    this.notificationService.isReadAll(this.team.id)
      .subscribe((data) => {
      });

  }

  public refreshData(): void {
      this.notificationSubscription =  this.notificationService.getLastNotifications(this.team.id)
      .subscribe((notifications) => {
        this.notifications = notifications.content;
        this.subscribeToData();
      }, error => this.msgErro = error);
  }

  public getTeam(): void {
    this.teamSubscription = this.teamService.buscarPorIdUser(this.currentUser.id)
      .subscribe((team) => {
        this.team = team;
        this.subscribeTeamToData();
      }, error => this.msgErro = error);
  }

  public subscribeToData(): void {

    this.timerSubscription = Observable.timer(1500)
      .subscribe(() => this.refreshData());
  }

    public subscribeTeamToData(): void {

    this.timerTeamSubscription = Observable.timer(1500)
      .subscribe(() => this.getTeam());
  }

}


  



