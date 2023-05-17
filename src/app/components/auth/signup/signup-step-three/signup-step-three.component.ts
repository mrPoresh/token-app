import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BasePageComponent } from 'src/app/components/base-components/base-page/base-page.component';

@Component({
  selector: 'app-signup-step-three',
  templateUrl: './signup-step-three.component.html',
  styleUrls: ['./signup-step-three.component.scss']
})
export class SignupStepThreeComponent extends BasePageComponent implements OnInit {

  vc_currency: any[] = [
    {value: 'VC_USD', viewValue: 'USD'},
    {value: 'VC_EUR', viewValue: 'EUR'},
  ];

  amounts: any[] = [
    {value: '10', viewValue: '10'},
    {value: '50', viewValue: '50'},
    {value: '100', viewValue: '100'},
    {value: '200', viewValue: '200'},
  ];

  formSubmited = false;

  registerForm3 = this.formBuilder.group({
    vc_currency: new FormControl('', [ Validators.required ]),
    amount: new FormControl('', [ Validators.required ]),
  });

  @Output() stepThree = new EventEmitter<{isCompleted: boolean, dataForm: FormGroup}>();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    super()
  }
  ngOnInit() {

  }

  onSubmit(registerForm3: FormGroup) {
    if (this.formSubmited || !this.registerForm3.valid) return;
    this.stepThree.next({isCompleted: true, dataForm: registerForm3});
  }

}
