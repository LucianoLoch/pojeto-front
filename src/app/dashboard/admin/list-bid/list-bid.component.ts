import { BidinfoService } from './../../../services/bidinfo.service';
import { TeamService } from './../../../services/team.service';
import { Bidinfo } from './../../../model/bidinfo.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-bid',
  templateUrl: './list-bid.component.html',
  styleUrls: ['./list-bid.component.css']
})
export class ListBidComponent implements OnInit {

  public bids : Array<Bidinfo> = []; 
  public msgErro : string;
  public bidsValue : number = 0;

  constructor(public bidinfoService : BidinfoService) { }

  ngOnInit() {
    this.bidinfoService.listarTodosBids()
      .subscribe((bids) => {
        this.bids = bids.content;
        this.getValues();
      }, error => this.msgErro = error);

  }

  getValues(){
    for (let bid of this.bids) {
      this.bidsValue = this.bidsValue + bid.bidValue;      
    }
  }
}