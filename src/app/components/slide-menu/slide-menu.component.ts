import { Component, EventEmitter, OnInit, Output, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SlideMenuBtnService } from 'src/app/utils/slide-menu-btn.service';
import { BasePageComponent } from '../base-components/base-page/base-page.component';

@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss']
})
export class SlideMenuComponent extends BasePageComponent implements OnInit {

  constructor(
    private router: Router,
    private menuService: SlideMenuBtnService
  ) {
    super()
  }

  ngOnInit() {}

  closeMenu() {
    this.menuService.updateMenuStatus(false);
  }

}
