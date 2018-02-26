import { PlayerAttributes } from './../../model/playerAttributes.model';
import { Player } from './../../model/player.model';
import { Transfermarket } from './../../model/transfermarket.model';
import { OnInit, Input } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-transfermarket-attributes',
  templateUrl: './transfermarket-attributes.component.html',
  styleUrls: ['./transfermarket-attributes.component.css']
})
export class TransfermarketAttributesComponent implements OnInit {

  public attributesName: Array<string> = [];
  constructor( @Inject(MAT_DIALOG_DATA) public data: Transfermarket) { }


  ngOnInit(){
    this.getAttributesName();
  }

  getAttributesName(){
    for (let att of this.data.player.attributes){
      this.attributesName.push(this.getName(att.name));
    }
  }

  getAttributeColor(attribute: number) {
    if (attribute >= 90) {
      return 'stats-90-99'
    } else if (attribute >= 80) {
      return 'stats-80-89'
    } else if (attribute >= 70) {
      return 'stats-70-79'
    } else if (attribute >= 50) {
      return 'stats-50-69'
    } else if (attribute < 50) {
      return 'stats-1-49'
    }
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

  getName(attribute: string): string {

    let retorno : string;

    switch (attribute) {
      case 'PAS': {
        retorno = 'Passes';
        break;
      }
      case 'SHO': {
        retorno = 'Finalização';
        break;

      }
      case 'DRI': {
        retorno = 'Drible';
        break;

      }
      case 'DEF': {
        retorno = 'Defesa';
        break;

      }
      case 'PHY': {
        retorno = 'Físico';
        break;

      }
      case 'PAC': {
        retorno = 'Ritmo';
        break;
      }

      default: {
        retorno = attribute;
        break;
      }
    }
    return retorno;

  }


}