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

  @Output() status = new EventEmitter<boolean>();
  /* @Input() routeTrx: string = 'login'; */

  constructor(
    private router: Router,
    private menuService: SlideMenuBtnService
  ) {
    super()
  }

  ngOnInit() {
/*     console.log('path', this.routeTrx);
    this.navigate(this.routeTrx); */
  }

  ngOnChanges() {
/*     console.log('path', this.routeTrx);
    this.navigate(this.routeTrx); */
  }

  closeMenu() {
    this.menuService.updateMenuStatus(false);
    
    this.status.emit(false);
  }

  navigate(url: string) {
/*     this.router.navigate([{ outlets: { 'slide-menu' : [url] }}]); */
  }

}
