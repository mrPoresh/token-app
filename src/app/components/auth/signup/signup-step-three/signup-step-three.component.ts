import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasePageComponent } from 'src/app/components/base-components/base-page/base-page.component';

@Component({
  selector: 'app-signup-step-three',
  templateUrl: './signup-step-three.component.html',
  styleUrls: ['./signup-step-three.component.scss']
})
export class SignupStepThreeComponent extends BasePageComponent implements OnInit {

  @Input() mnemonic!: string;

  constructor(

  ) {
    super()
  }
  ngOnInit() {

  }

}
