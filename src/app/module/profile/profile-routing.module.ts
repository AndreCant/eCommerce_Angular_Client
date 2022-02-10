import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from 'src/app/components/profile-page/profile/profile.component';
import { AuthGuardService } from 'src/app/services/auth/auth-guard.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: ProfileComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileRoutingModule { }
