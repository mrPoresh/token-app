import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { takeUntil } from 'rxjs';

import { BasePageComponent } from 'src/app/components/base-components/base-page/base-page.component';
import { RegistrationService } from 'src/app/services/auth/signup/registration.service';
import { LoaderService } from 'src/app/utils/loader.service';
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

  mnemonic = 'Hello';

  private dataForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    firstname: new FormControl(''),
    surname: new FormControl(''),
    currency: new FormControl(''),
  })

  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('step1', { static: false }) step1!: SignupStepOneComponent;
  @ViewChild('step2', { static: false }) step2!: SignupStepOneComponent;

  constructor(
    private loaderService: LoaderService,
    private registrarionService: RegistrationService,
  ) {
    super() 
  }

  ngOnInit() {

  }

  completeStepOne(result: any) {
    this.isCompleted1 = result.isCompleted;

    if (this.isCompleted1) {
      this.dataForm.patchValue({
        username: result.emailForm.value.username,
        password: result.emailForm.value.password,
      });

      this.stepper.next();

    }

    this.selectedIndex = 1;

  }

  completeStepTwo(result: any) {
    this.isCompleted2 = result.isCompleted;
    this.isCompleted3 = result.isCompleted;

    if (this.isCompleted2) {
      this.dataForm.patchValue({
        firstname: result.dataForm.value.firstname,
        surname: result.dataForm.value.surname,
        currency: result.dataForm.value.currency,
      });

      console.log('dataForm', this.dataForm.value)

      this.loaderService.show({status: true});

      this.registrarionService.postRegistration(this.dataForm).pipe(takeUntil(this.unsubscribe)).subscribe({
        next: (res) => { this.mnemonic = res; this.stepper.next(); this.loaderService.hide();},
        error: (err) => { console.log(err); this.loaderService.hide(); }  //err !
      });

    }

    this.selectedIndex = 2;

  }

}
