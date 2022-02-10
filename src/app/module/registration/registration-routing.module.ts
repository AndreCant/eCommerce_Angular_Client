import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from 'src/app/components/registration/registration.component';
import { GuestGuardService } from 'src/app/services/auth/guest-guard.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: RegistrationComponent, canActivate: [GuestGuardService] },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RegistrationRoutingModule { }
