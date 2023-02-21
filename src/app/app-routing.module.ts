import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { loginTrx, rootTrx, testTrx } from './router-translation.labels';

import { FrontPageComponent } from './components/front-page/front-page.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SlideMenuComponent } from './components/slide-menu/slide-menu.component';


const routes: Routes = [
  {
    path: rootTrx, component: FrontPageComponent
  },
  {
    path: loginTrx, outlet: 'menu', component: LoginComponent
  },
  {
    path: testTrx, outlet: 'menu', component: FrontPageComponent
  }
/*   {
    path: rootTrx, outlet: 'front-page', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
