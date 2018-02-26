import { AlertService } from './../../services/alert.service';
import { BidinfoService } from './../../services/bidinfo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public marketOpen: Boolean;

  constructor(public bidService : BidinfoService,
              public alertService: AlertService) { }

  ngOnInit() {
    this.isOpen();
  }

  onOpenMarket(){
    this.bidService.openMarket()
      .subscribe((data) => {
        this.alertService.success('Mercado Aberto com Sucesso!');
      });
  }

  isOpen(){
    this.bidService.isOpen()
      .subscribe((data) => {
        this.marketOpen = data;
      })
  }

}
