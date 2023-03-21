import { Component, Input, OnInit } from '@angular/core';
import { BasePageComponent } from '../../base-components/base-page/base-page.component';

@Component({
  selector: 'app-promoted',
  templateUrl: './promoted.component.html',
  styleUrls: ['./promoted.component.scss']
})
export class PromotedComponent extends BasePageComponent implements OnInit {

  @Input() category: any;

  constructor() {
    super()
  }

  ngOnInit() {
    
  }

}
