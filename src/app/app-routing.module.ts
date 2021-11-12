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

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent, canActivate: [GuestGuardService]},
  {path: "registration", canActivate: [GuestGuardService], component: RegistrationComponent},
  {path: "profile", canActivate: [AuthGuardService], component: ProfileComponent},
  {path: 'products/:gender/:type/:subtype', component: ProductListComponent },
  {path: 'product/:id', component: ProductPageComponent },
  {path: 'checkout', component: CheckoutComponent,  canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }