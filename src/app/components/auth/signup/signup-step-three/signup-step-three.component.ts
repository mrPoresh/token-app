import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BasePageComponentWithDialogs } from 'src/app/components/base-components/base-page/base-page.component';

@Component({
  selector: 'app-signup-step-three',
  templateUrl: './signup-step-three.component.html',
  styleUrls: ['./signup-step-three.component.scss']
})
export class SignupStepThreeComponent extends BasePageComponentWithDialogs implements OnInit {

  constructor(
    errorDialog: MatDialog,
  ) {
    super(errorDialog)
  }

}
