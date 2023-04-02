import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { DataNftService } from 'src/app/services/http/data-nft.service';
import { LoaderService } from 'src/app/utils/loader.service';
import { BasePageComponent } from '../base-components/base-page/base-page.component';

export interface ForntDataResponce {
  data: [
    undefined
  ]
};  

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent extends BasePageComponent implements OnInit {

  public PromotedNFTs = PromotedNFTs; // ?
  public category = PromotedNFTs.all;
  public data_set!: ForntDataResponce;  //

  public choosedToken = 'ethereum';
  public listsSet: any = undefined;
  public tabSet: any = undefined;
  public isExtend = true;

  constructor(
    private router: Router,
    private formBulder: FormBuilder,
    private dataService: DataNftService,
    private loader: LoaderService,
  ) {
    super();

    this.loader.show({status: true});
  }

  ngOnInit() {
    if (window.screen.width < 800) {
      this.isExtend = false;
    }

    this.dataService.getFrontPageLists().pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
      this.tabSet = res.data.tabs;
      console.log(this.tabSet);
      this.loader.hide();
    });
    
  }

  changeTokenTab() {

  }

  changeCategory(category: any) {
    this.category = category;
  }

}

export const PromotedNFTs = {
  art: {
    image: "/assets/promoted/all.png",
    name: 'Life in Our Minds',
    address: '0x6144226e04dce7f9d9cc468b98d8667648613ed9',
    owner: 'Cool Boy',
    chain: 'ethereum'
  },
  all: {
    image: "/assets/promoted/art.png",
    name: 'MidnightBreeze',
    address: '0xd9c036e9eef725e5aca4a22239a23feb47c3f05d',
    owner: 'Cool Boy',
    chain: 'ethereum'
  },
  gaming: {
    image: "/assets/promoted/game.png",
    name: 'Realms',
    address: '0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d',
    owner: 'Cool Boy',
    chain: 'ethereum'
  },
  photo: {
    image: "/assets/promoted/photo.png",
    name: 'Aotearoa Dreaming',
    address: '0x495f947276749ce646f68ac8c248420045cb7b5e',
    owner: 'Cool Boy',
    chain: 'ethereum'
  },
};
