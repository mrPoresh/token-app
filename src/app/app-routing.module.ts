import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { loginTrx, rootTrx, signUpTrx, testTrx, walletTrx, userTrx } from './router-translation.labels';

import { FrontPageComponent } from './components/front-page/front-page.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupFormComponent } from './components/auth/signup/signup-form/signup-form.component';
import { WalletSlideComponent } from './components/wallet-slide/wallet-slide.component';
import { UserSlideComponent } from './components/user-slide/user-slide.component';
import { AuthGuard } from './utils/guards/auth.guard';


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
    path: walletTrx, outlet: 'menu', canActivate: [AuthGuard], component: WalletSlideComponent
  },
  {
    path: userTrx, outlet: 'menu', canActivate: [AuthGuard], component: UserSlideComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
