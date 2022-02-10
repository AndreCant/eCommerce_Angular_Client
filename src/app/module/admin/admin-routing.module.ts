import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from 'src/app/components/admin-page/admin-layout/admin-layout.component';
import { AdminGuardService } from 'src/app/services/auth/admin-guard.service';

const routes: Routes = [
  { path: '', component: AdminLayoutComponent,  canActivate: [AdminGuardService] },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule { }
