import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { menuOutlet, loginTrx, signUpTrx, walletTrx, userTrx, frontRootTrx, frontArtTrx, frontGamingTrx, frontPhotoTrx } from './router-translation.labels';

import { FrontPageComponent } from './components/front-page/front-page.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupFormComponent } from './components/auth/signup/signup-form/signup-form.component';
import { WalletSlideComponent } from './components/slide-menu/wallet-slide/wallet-slide.component';
import { UserSlideComponent } from './components/slide-menu/user-slide/user-slide.component';
import { AuthGuard } from './utils/guards/auth.guard';


const routes: Routes = [
  {
    path: frontRootTrx, component: FrontPageComponent
  },
  {
    path: loginTrx, outlet: menuOutlet, component: LoginComponent
  },
  {
    path: signUpTrx, outlet: menuOutlet, component: SignupFormComponent
  },
  {
    path: walletTrx, outlet: menuOutlet, canActivate: [AuthGuard], component: WalletSlideComponent
  },
  {
    path: userTrx, outlet: menuOutlet, canActivate: [AuthGuard], component: UserSlideComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
