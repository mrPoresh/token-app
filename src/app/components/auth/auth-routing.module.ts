import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { loginTrx } from 'src/app/router-translation.labels';

import { LoginComponent } from './login/login.component';

const routes: Routes = [
/*   {
    path: loginTrx,
    outlet: 'slide-menu',
    component: LoginComponent,
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
