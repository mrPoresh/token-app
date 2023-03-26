import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent extends BasePageComponent implements OnInit {

  @Input() item!: any;
  //@Output() _data = new EventEmitter<any>();

  constructor() {
    super()
  }

  ngOnInit() {
    console.log("item", this.item)
  }

  /* onClick(data: any) {
    this._data.emit(data);
  } */

}
