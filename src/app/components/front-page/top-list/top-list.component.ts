import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../../base-components/base-page/base-page.component';

@Component({
  selector: 'app-top-list',
  templateUrl: './top-list.component.html',
  styleUrls: ['./top-list.component.scss']
})
export class TopListComponent extends BasePageComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {
    
  }
}
