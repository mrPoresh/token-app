import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { menuOutlet, signUpTrx } from 'src/app/router-translation.labels';
import { UserInfo } from 'src/app/services/auth/auth.models';

import { LoginEmailService } from 'src/app/services/auth/login/login-email.service';
import { LoaderService } from 'src/app/utils/loader.service';
import { SlideMenuBtnService } from 'src/app/utils/slide-menu-btn.service';
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
    private menuService: SlideMenuBtnService,
    private loader: LoaderService,
  ) { super() }

  ngOnInit() {
    
  }

  onSubmit(loginForm: FormGroup) {
    this.loader.show({status: true});
    this.loginService.requestLoginUser(loginForm).subscribe({
      next: (res) => { console.log(res); this.menuService.updateMenuStatus(false); this.loader.hide() },
      error: (err) => { console.log(err); this.loader.hide()}
    });
  }

  navigateSlideMenu(url: string) {
    console.log('url', url)
    this.router.navigate([{ outlets: { [menuOutlet] : [url] }}]);
  }

}
