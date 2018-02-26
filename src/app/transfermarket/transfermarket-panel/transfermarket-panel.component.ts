import { Team } from './../../model/team.model';
import { AlertService } from './../../services/alert.service';
import { TeamService } from './../../services/team.service';
import { Transfermarket } from './../../model/transfermarket.model';
import { Bidinfo } from './../../model/bidinfo.model';
import { PlayerFilter } from './../../model/playerFilter.model';
import { TransfermarketService } from './../../services/transfermarket.service';
import { Player } from './../../model/player.model';
import { TransfermarketNameFilter } from './../../services/transfermarket.pipe';
import { PlayerAttributes } from './../../model/playerAttributes.model';
import { BidinfoService } from './../../services/bidinfo.service';
import { TransfermarketAttributesComponent } from './../transfermarket-attributes/transfermarket-attributes.component';
import { MatDialog } from '@angular/material';

import { Component, OnInit, ViewChild, Inject, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from "rxjs/Subscription";
import { PaginationInstance } from 'ngx-pagination';
import { IPageChangeEvent } from '@covalent/core';
import { MatSlideToggle } from '@angular/material';
import { DOCUMENT } from "@angular/platform-browser";




import {
    TdDataTableService,
    TdDataTableSortingOrder,
    ITdDataTableSortChangeEvent,
    ITdDataTableColumn,
    TdDataTableComponent,
    TdLoadingService
} from '@covalent/core';
import { Rest } from 'app/model/rest.model';


@Component({
    selector: 'app-transfermarket-panel',
    templateUrl: './transfermarket-panel.component.html',
    styleUrls: ['./transfermarket-panel.component.css']
})
export class TransfermarketPanelComponent implements OnInit {

    columns: ITdDataTableColumn[] = [
        { name: 'name', label: 'Jogador', tooltip: 'Nome do Jogador' },
        { name: 'rating', label: 'Rating' },
        { name: 'position', label: 'Posição' },
        { name: 'bidValue', label: 'Lance', numeric: true, filter: true },
        { name: 'originalValue', label: 'Lance Inicial', numeric: true, filter: true },
        { name: 'hasBid', label: 'Tem Lance', filter: true },
        { name: 'bidAproved', label: 'Lance Aprovado', filter: true },
        { name: 'attribute', label: 'Atributos' },
        { name: 'bid', label: 'Lance' },

    ];

    data: Transfermarket[] = [];
    filteredData: Transfermarket[] = this.data;
    filteredTotal: number = this.data.length;
    searchTerm: string = '';
    fromRow: number = 1;
    currentPage: number = 1;
    pageSize: number = 20;
    sortBy: string = 'rating';
    selectedRows: any[] = [];
    sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
    overlayStarSyntax: boolean = false;

    public bid: Bidinfo;
    public playerFilter: PlayerFilter;
    public team: Team;
    public transfermarketRest: Rest = {};
    public attributesName: Array<string> = [];
    public toogle: boolean;
    public fixed: boolean = false;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        public _dataTableService: TdDataTableService,
        public transfermarketService: TransfermarketService,
        public alertService: AlertService,
        public route: ActivatedRoute,
        public dialog: MatDialog,
        public bidinfoService: BidinfoService,
        public teamService: TeamService,
        public _loadingService: TdLoadingService) {

        this.transfermarketRest.content = [];

        this.route.queryParams.subscribe(params => {
            this.playerFilter = params["playerFilter"];
        });

    }


    open() {
        this.toogle = true;
    }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        console.log('scroll');
        let num = this.document.body.scrollTop;
        if (num > 50) {
            this.fixed = true;
        } else if (this.fixed && num < 5) {
            this.fixed = false;
        }
    }

    getTransfermarket() {
        this._loadingService.register('overlayStarSyntax');

        let promise = this.transfermarketService.listarFilter2(this.playerFilter, this.currentPage - 1);

        promise.then((transferMarket) => {
            this.transfermarketRest = transferMarket;
            this.data = this.transfermarketRest.content;
            this.team = this.transfermarketService.getTeam();
            this.filter();
            this._loadingService.resolve('overlayStarSyntax');
        })
    }

    ngOnInit() {
        this.bid = new Bidinfo();
        this.getTransfermarket();
    }



    sort(sortEvent: ITdDataTableSortChangeEvent): void {
        this.sortBy = sortEvent.name;
        this.sortOrder = sortEvent.order;
        this.filter();
    }

    search(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.fromRow = 1;
        this.currentPage = 1;
        this.filter();
    }

    page(pagingEvent: IPageChangeEvent): void {
        this.fromRow = pagingEvent.fromRow;
        this.currentPage = pagingEvent.page;
        this.pageSize = pagingEvent.pageSize;
        this.getTransfermarket();
    }

    filter(): void {
        let newData: any[] = this.data;
        newData = this._dataTableService.filterData(newData, this.searchTerm, true);
        this.filteredTotal = newData ? newData.length : 0;
        newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
        this.filteredData = newData;
    }


    onRefresh() {
        this.bid = new Bidinfo();
        this.getTransfermarket();
        this.filter();
    }

    onExpand(transferMarket: Transfermarket) {
        if (!transferMarket.expanded) {
            transferMarket.expanded = true;
            transferMarket.icon = "fa fa-chevron-up";
        } else {
            transferMarket.expanded = false;
            transferMarket.icon = "fa fa-chevron-down";
        }
    }

    check(player: Player): Promise<string> {
        return new Promise((resolve, reject) => {
            let mensagem: string = '';

  /*          if (player.bid.team === this.team.id) {
                mensagem = 'Você já está vencendo este leilão!';
                resolve(mensagem);
            } else {
*/
                this.teamService.buscarPorIdUser(this.team.idUser)
                    .subscribe((team) => {
                        console.log(team);
                        this.team = team;
                        console.log('Bid Value: ' + player.bid.bidValue);
                        console.log('Team Bid: ' + this.team.budget);
                        if (player.bid.bidValue > this.team.budget) {
                            mensagem = 'Você não possui dinheiro suficiente. Lance: R$ ' + player.bid.bidValue + ',00' +
                                '. Dinheiro Disponível: R$' + this.team.budget + ',00';
                        }
                        resolve(mensagem);
                    });
//            }
        });
    }


    onBid(player: Player) {
        let promise = this.check(player);
        player.attributes = [];

        promise.then((check) => {
            console.log(check);
            this._loadingService.register('replaceTemplateSyntax');

            if (check.length === 0) {
                    this.bidinfoService.placeBid(player)
                        .subscribe(
                        (res) => {
                            this.alertService.success('Lance efetuado com sucesso!', true);
                            this._loadingService.resolve('replaceTemplateSyntax');
                            this.onRefresh();
                        },
                        (err) => {
                            this._loadingService.resolve('replaceTemplateSyntax');
                            this.alertService.error(err);

                        });                

            } else {
                this.alertService.error(check);
            }

        });
    }

    closeMarket() {
        this.bidinfoService.closeMarket()
            .subscribe(
            (res) => {
                this.alertService.success('Mercado fechado com sucesso!', true);
            },
            (err) => {
                this.alertService.error(err);
            });
    }

    openDialog(transferMarket: Transfermarket) {
        this.dialog.open(TransfermarketAttributesComponent, {
            width: '600px',
            height: '400px',
            data: {
                player: transferMarket.player,
            }
        });
    }   

    getRatingColor(attribute: number) {
        if (attribute >= 75) {
            return 'rating-75-99'
        } else if (attribute >= 65) {
            return 'rating-65-74'
        } else if (attribute < 65) {
            return 'rating-1-64'
        }
    }    

    getBackground(shop: Transfermarket) {
        let style = 'background-gray-6';
        if (shop.hasBid) {
            style = 'background-bid';
            if (shop.bidAproved) {
                style = 'background-your-bid'
            }
        }
        return style;
    }
}