import { PlayerAttributes } from './../../../model/playerAttributes.model';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {

  constructor() { }

  @Input () attributes : Array<PlayerAttributes>;

  ngOnInit() {
    this.sort();
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

  sort(){
    let att = this.attributes;

    att.sort((n1: PlayerAttributes, n2: PlayerAttributes) => {
      if (n1.name > n2.name) {
          return 1;
      }  
      if (n1.name < n2.name) {
          return -1;
      }  
      return 0;
     });
     this.attributes = att;

    
  }

}
