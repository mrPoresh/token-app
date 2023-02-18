import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { UserInfo } from 'src/app/services/auth/auth.models';

import { LoginEmailService } from 'src/app/services/auth/login/login-email.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword = true;
  formSubmited = true;

  loginResponse!: UserInfo;

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required]
  });

  constructor(
    public formBuilder: FormBuilder,
    protected loginService: LoginEmailService,
  ) { }

  ngOnInit() {
    
  }

  onSubmit(loginForm: FormGroup) {
    console.log('some');
    this.loginService.requestLoginUser(loginForm).subscribe((resp) => {
      console.log('result', resp)
    });
  }

}
