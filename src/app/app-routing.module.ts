import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProfileComponent } from './components/profile-page/profile/profile.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { GuestGuardService } from './services/auth/guest-guard.service';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductPageComponent } from './components/products/product-page/product-page.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminLayoutComponent } from './components/admin-page/admin-layout/admin-layout.component';
import { AdminGuardService } from './services/auth/admin-guard.service';
import { NotFoundPageComponent } from './components/commons/not-found-page/not-found-page.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent, canActivate: [GuestGuardService]},
  {path: "registration", component: RegistrationComponent, canActivate: [GuestGuardService]},
  {path: "profile", component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'products/:gender/:type/:subtype', component: ProductListComponent },
  {path: 'product/:id', component: ProductPageComponent },
  {path: 'checkout', component: CheckoutComponent,  canActivate: [AuthGuardService] },
  {path: 'admin', component: AdminLayoutComponent,  canActivate: [AdminGuardService] },
  {path: '404', component: NotFoundPageComponent },
  {path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }