import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

import { BasePageComponent } from 'src/app/components/base-components/base-page/base-page.component';
import { SignupStepOneComponent } from '../signup-step-one/signup-step-one.component';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent extends BasePageComponent implements OnInit {

  selectedIndex = 0;
  isLinear = true;      /* for skiping steps */
  isEditable = false;   /* for back */

  isCompleted1 = false;  /*  */
  isCompleted2 = false;
  isCompleted3 = false;

  @Output() closeEvent = new EventEmitter();

  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('step1', { static: false }) step1!: SignupStepOneComponent;
  @ViewChild('step2', { static: false }) step2!: SignupStepOneComponent;

  closeDialog(url: string): void {
    this.closeEvent.next(url);
  }

  constructor(
  ) {
    super() 
  }

  ngOnInit() {

  }

  completeStepOne(result: boolean) {
    this.isCompleted1 = result;
    if (this.isCompleted1) {
      this.stepper.next();
    }

    this.selectedIndex = 1;

  }

  completeStepTwo(result: boolean) {
    this.isCompleted2 = result;
    this.isCompleted3 = result;
    if (this.isCompleted2) {
      this.stepper.next();
    }

    this.selectedIndex = 2;

  }

}
