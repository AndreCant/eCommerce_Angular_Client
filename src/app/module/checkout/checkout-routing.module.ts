import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from 'src/app/components/checkout/checkout.component';
import { AuthGuardService } from 'src/app/services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: CheckoutComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CheckoutRoutingModule { }
