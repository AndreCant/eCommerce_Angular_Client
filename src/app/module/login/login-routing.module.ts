import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { GuestGuardService } from 'src/app/services/auth/guest-guard.service';

const routes: Routes = [
  { path: "", component: LoginComponent, canActivate: [GuestGuardService] },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginRoutingModule { }
