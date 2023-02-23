import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { menuOutlet, signUpTrx } from 'src/app/router-translation.labels';
import { UserInfo } from 'src/app/services/auth/auth.models';

import { LoginEmailService } from 'src/app/services/auth/login/login-email.service';
import { BasePageComponent } from '../../base-components/base-page/base-page.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BasePageComponent implements OnInit {

  signUpTrx = signUpTrx;

  hidePassword = true;
  formSubmited = true;

  loginResponse!: UserInfo;

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required]
  });

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    protected loginService: LoginEmailService,
  ) { super() }

  ngOnInit() {
    
  }

  onSubmit(loginForm: FormGroup) {
    this.loginService.requestLoginUser(loginForm).subscribe((resp) => {
      console.log('result', resp)
    });
  }

  navigateSlideMenu(url: string) {
    this.router.navigate([{ outlets: { [menuOutlet] : [url] }}]);
  }

}
