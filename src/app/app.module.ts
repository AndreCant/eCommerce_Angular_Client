import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/commons/navbar/navbar.component';
import { FooterComponent } from './components/commons/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginResult } from './model/LoginResult';
import { AppConstants } from './app.constants';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile-page/profile/profile.component';
import { appReducers } from './reducers/app.reducers';
import { RegistryEffects } from './effects/registry-effects.service';
import { UserEffects } from './effects/user-effects.service';
import { RegistryFormComponent } from './components/profile-page/registry-form/registry-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { PaymentEffects } from './effects/payment-effects.service';
import { AddPaymentComponent } from './components/commons/add-payment/add-payment.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { MegaMenuComponent } from './components/commons/mega-menu/mega-menu.component';
import { ProductService } from './services/product.service';
import { ProductEffects } from './effects/product-effects.service';
import { ProductPageComponent } from './components/products/product-page/product-page.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderEffects } from './effects/order-effects.service';
import { OrdersComponent } from './components/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    RegistryFormComponent,
    AddPaymentComponent,
    ProductListComponent,
    MegaMenuComponent,
    ProductPageComponent,
    CheckoutComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([RegistryEffects, UserEffects, PaymentEffects, ProductEffects, OrderEffects]),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    CommonModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [AppConstants.DOMAIN]
      }
    }),

    //https://angular.io/guide/service-worker-config
    ServiceWorkerModule.register('ngsw-worker.js', { 
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function tokenGetter() {
  let loginStored: LoginResult;

  let loginStr: string | null = localStorage.getItem(AppConstants.LOGIN_STORAGE);

  if (loginStr) {
    loginStored = JSON.parse(loginStr);
  } else {
    return '';
  }

  return loginStored.token;
}
