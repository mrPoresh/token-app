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
  public isExtend = true;

  private dataForm = this.formBulder.group({
    addresses: new FormControl(TopList.addresses),
    chain: new FormControl(TopList.chain),
    pageSize: new FormControl(TopList.pageSize),
  });

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

    this.dataService.getFrontPageLists(this.dataForm).pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
      console.log(res);
      this.data_set = res;
      console.log("data set",this.data_set);
      this.loader.hide();
    });
  }

  changeCategory(category: any) {
    this.category = category;
  }

}

export const TopList = {
  addresses: [
    { topAll: ['0xed5af388653567af2f388e6224dc7c4b3241c544', '0xed5af388653567af2f388e6224dc7c4b3241c544', 
      '0x23581767a106ae21c074b2276d25e5c3e136a68b', '0xed5af388653567af2f388e6224dc7c4b3241c544',
      '0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949', '0x1a92f7381b9f03921564a437210bb9396471050c',
    ]},
    { topArt: ['0xed5af388653567af2f388e6224dc7c4b3241c544', '0xed5af388653567af2f388e6224dc7c4b3241c544', 
      '0x23581767a106ae21c074b2276d25e5c3e136a68b', '0xed5af388653567af2f388e6224dc7c4b3241c544',
      '0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949', '0x1a92f7381b9f03921564a437210bb9396471050c',
    ]},
    // { topArt: []},
    // { topGaming: []},
    // { topPhoto: []},
  ],
  chain: 'ethereum',
  pageSize: '1'
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
