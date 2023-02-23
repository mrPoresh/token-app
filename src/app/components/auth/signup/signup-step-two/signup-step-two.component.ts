import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

import { BasePageComponentWithDialogs } from 'src/app/components/base-components/base-page/base-page.component';

@Component({
  selector: 'app-signup-step-two',
  templateUrl: './signup-step-two.component.html',
  styleUrls: ['./signup-step-two.component.scss']
})
export class SignupStepTwoComponent extends BasePageComponentWithDialogs implements OnInit {

  formSubmited = false;

  registerForm2 = this.formBuilder.group({
    firstName: new FormControl('', [ Validators.required ]),
    surname: new FormControl('', [ Validators.required ]),
    acceptTerms: new FormControl('', [ Validators.required ]),
    emailSpam: new FormControl('', [ Validators.required ]),
  });

  @Output() isCompleted = new EventEmitter<boolean>();

  constructor(
    errorDialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {
    super(errorDialog)
  }

  onSubmit(registerForm2: FormGroup) {
    if (this.formSubmited || !this.registerForm2.valid) return;
    console.log("Form 2 ->", registerForm2);
    this.isCompleted.next(true);

  }

}
