import { Team } from './../model/team.model';
import { User } from './../model/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() currentUser: User;
  @Input() team : Team;
}
