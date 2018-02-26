import { Player } from './../../../model/player.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-attributes-item',
  templateUrl: './attributes-item.component.html',
  styleUrls: ['./attributes-item.component.css']
})
export class AttributesItemComponent implements OnInit {

  @Input() player : Player;

  constructor() { }

  ngOnInit() {
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
