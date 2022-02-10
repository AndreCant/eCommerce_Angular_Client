import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { GuestGuardService } from './services/auth/guest-guard.service';
import { AdminGuardService } from './services/auth/admin-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./module/home/home.module').then((mod) => mod.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./module/login/login.module').then((mod) => mod.LoginModule),
      canActivate: [GuestGuardService]
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./module/registration/registration.module').then((mod) => mod.RegistrationModule),
      canActivate: [GuestGuardService]
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./module/profile/profile.module').then((mod) => mod.ProfileModule),
      canActivate: [AuthGuardService]
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./module/checkout/checkout.module').then((mod) => mod.CheckoutModule),
      canActivate: [AuthGuardService]
  },
  {
    path: 'product/:id',
    loadChildren: () =>
      import('./module/product/product.module').then((mod) => mod.ProductModule)
  },
  {
    path: 'products/:gender/:type/:subtype',
    loadChildren: () =>
      import('./module/product-list/product-list.module').then((mod) => mod.ProductListModule)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./module/admin/admin.module').then((mod) => mod.AdminModule),
      canActivate: [AdminGuardService]
  },
  {
    path: '404',
    loadChildren: () =>
      import('./module/not-found/not-found.module').then((mod) => mod.NotFoundModule)
  },
  { 
    path: '**', 
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }