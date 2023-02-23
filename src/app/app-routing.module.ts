import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { loginTrx, rootTrx, signUpTrx, testTrx } from './router-translation.labels';

import { FrontPageComponent } from './components/front-page/front-page.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupFormComponent } from './components/auth/signup/signup-form/signup-form.component';


const routes: Routes = [
  {
    path: rootTrx, component: FrontPageComponent
  },
  {
    path: loginTrx, outlet: 'menu', component: LoginComponent
  },
  {
    path: signUpTrx, outlet: 'menu', component: SignupFormComponent
  },
  {
    path: testTrx, outlet: 'menu', component: FrontPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
