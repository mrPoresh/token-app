import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BasePageComponent } from 'src/app/components/base-components/base-page/base-page.component';

@Component({
  selector: 'app-signup-step-two',
  templateUrl: './signup-step-two.component.html',
  styleUrls: ['./signup-step-two.component.scss']
})
export class SignupStepTwoComponent extends BasePageComponent implements OnInit {

  currency: any[] = [
    {value: 'LTC', viewValue: 'LTC'},
    {value: 'ETH', viewValue: 'ETH'},
    {value: 'BTC', viewValue: 'BTC'},
  ];

  formSubmited = false;

  registerForm2 = this.formBuilder.group({
    firstname: new FormControl('', [ Validators.required ]),
    surname: new FormControl('', [ Validators.required ]),
    currency: new FormControl(''),
    acceptTerms: new FormControl('', [ Validators.required ]),
    emailSpam: new FormControl('', [ Validators.required ]),
  });

  @Output() stepTwo = new EventEmitter<{isCompleted: boolean, dataForm: FormGroup}>();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    super()
  }
  ngOnInit() {

  }

  onSubmit(registerForm2: FormGroup) {
    if (this.formSubmited || !this.registerForm2.valid) return;
    this.stepTwo.next({isCompleted: true, dataForm: registerForm2});
  }

}
