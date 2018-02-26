import { Player } from './../../../model/player.model';
import { PlayerAttributes } from './../../../model/playerAttributes.model';
import { single, multi, attributes } from './data';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  @Input() attributes : Array<PlayerAttributes>;

  public single = [   
  ];
  
  public multi = [    
  ];

  constructor() { 
    Object.assign(this, {single})   
  }

  ngOnInit() {

    for (let att of this.attributes){
      att.name = this.getName(att.name);

      let color = {
        "name": att.name,
        "value": this.getAttributeColor(att.value)
      }
      this.single.push(att); 
      this.customColors.push(color);   
    }    
  }

  customColors = [];

  

  getAttributeColor(attribute: number): string {
    if (attribute >= 90) {
      return '#1C8502'
    } else if (attribute >= 80) {
      return '#99cf46'
    } else if (attribute >= 70) {
      return '#e8b415'
    } else if (attribute >= 50) {
      return '#c8790a'
    } else if (attribute < 50) {
      return '#bd2f2f'
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
        retorno = 'Passe';
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



   view: any[] = [400, 200];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  yAxisLabel = 'Qualidades';

  colorScheme = {
    domain: ['#1C8502', '#99cf46', '#e8b415', '#c8790a','#bd2f2f']
  };




  

}
