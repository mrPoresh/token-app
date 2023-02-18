import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { loginTrx, rootTrx } from './router-translation.labels';

import { FrontPageComponent } from './components/front-page/front-page.component';
import { LoginComponent } from './components/auth/login/login.component';


const routes: Routes = [
  {
    path: rootTrx, component: FrontPageComponent
  },
/*   {
    path: rootTrx, outlet: 'front-page', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  }, */
  {
    path: loginTrx, outlet: 'slide-menu', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
