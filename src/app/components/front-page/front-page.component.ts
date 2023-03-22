import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { DataNftService } from 'src/app/services/http/data-nft.service';
import { BasePageComponent } from '../base-components/base-page/base-page.component';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent extends BasePageComponent implements OnInit {

  public PromotedNFTs = PromotedNFTs; // ?
  public category = PromotedNFTs.all;
  public nftLists: any;  //

  private dataForm = this.formBulder.group({
    addresses: new FormControl(TopList.addresses),
    chain: new FormControl(TopList.chain),
    pageSize: new FormControl(TopList.pageSize),
  });

  constructor(
    private router: Router,
    private formBulder: FormBuilder,
    private dataService: DataNftService,
  ) {
    super();

  }

  ngOnInit() {
/*     this.dataService.getFrontPageLists(this.dataForm).pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      console.log(res);
      this.nftLists = res;
    }); */
  }

  changeCategory(category: any) {
    this.category = category;
  }

}

export const TopList = {
  addresses: [
    {topAll: ['0xa884dc714629ca03570696b3445999d914a217cb', '0x4e1f41613c9084fdb9e34e11fae9412427480e56', 
      '0x23581767a106ae21c074b2276d25e5c3e136a68b', '0xed5af388653567af2f388e6224dc7c4b3241c544',
      '0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949', '0x79fcdef22feed20eddacbb2587640e45491b757f',
      '0x282bdd42f4eb70e7a9d9f40c8fea0825b7f68c5d', '0x1a92f7381b9f03921564a437210bb9396471050c',
      '0x845a007d9f283614f403a24e3eb3455f720559ca', '0xba66a7c5e1f89a542e3108e3df155a9bf41ac824,'

    ]},
    {topArt: ['0xa1d4657e0e6507d5a94d06da93e94dc7c8c44b51', '0x31d843b99c2c4088cd20d96ef2426673b958ff70', 
      '0x5c109fb6644a97a6f4cfbd8d8f03bddae843a764', '0x32d4be5ee74376e08038d652d4dc26e62c67f436',
      '0xaa7200ee500de2dcde75e996de83cbd73bca9705', '0xd2a713c0f0953ccbffd93c86534624de5940e62e',
      '0x9ce07b945b4cb912e338d141cf95e9636bf2e836', '0x5755ab845ddeab27e1cfce00cd629b2e135acc3d',
      '0x286e531f363768fed5e18b468f5b76a9ffc33af5', '0xb20e024da94fef84b5dbde3a639048952de58169'
    ]}
    //topGaming: [],
    //topPhoto: [],
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
