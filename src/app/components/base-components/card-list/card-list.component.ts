import { Component, Input, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent extends BasePageComponent implements OnInit {

  @Input() category!: undefined;

  public name!: string;

  constructor() {
    super();
  }

  ngOnInit() {
    console.log("Cat", this.category);
  }

}
