import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';

import { LoaderService } from 'src/app/utils/loader.service';

import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent extends BasePageComponent implements OnInit {

  isShow = false;
  tasks: any[] = [];

  constructor(private loaderService: LoaderService) { super() }

  ngOnInit() {
    this.loaderService.attach().pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.isShow = res.status;

      if (res.params) {
        this.tasks = res.params;
      }
    });
  }

}
