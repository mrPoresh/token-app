import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BasePageComponent } from 'src/app/components/base-components/base-page/base-page.component';
import { menuOutlet, loginTrx } from 'src/app/router-translation.labels';

@Component({
  selector: 'app-signup-step-one',
  templateUrl: './signup-step-one.component.html',
  styleUrls: ['./signup-step-one.component.scss']
})
export class SignupStepOneComponent extends BasePageComponent implements OnInit {

  loginTrx = loginTrx;

  hidePassword = true;
  formSubmited = false;

  registerForm1 = this.formBuilder.group({
    username: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(7) ]),
  });

  @Output() stepOne = new EventEmitter<{isCompleted: boolean, emailForm: FormGroup}>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    super() 
  }
  ngOnInit() {

  }

  navigateSlideMenu(url: string) {
    this.router.navigate([{ outlets: { [menuOutlet] : [url] }}]);
  }

  onSubmit(registerForm1: FormGroup) {
    if (this.formSubmited || !this.registerForm1.valid) return;
    this.stepOne.next({isCompleted: true, emailForm: registerForm1});

  }

}
