import { Component, Input, OnInit } from '@angular/core';
import { BasePageComponent } from 'src/app/components/base-components/base-page/base-page.component';

@Component({
  selector: 'app-signup-step-four',
  templateUrl: './signup-step-four.component.html',
  styleUrls: ['./signup-step-four.component.scss']
})
export class SignupStepFourComponent extends BasePageComponent implements OnInit {
  @Input() mnemonic!: string;

  constructor(

  ) {
    super()
  }
  ngOnInit() {

  }
}
