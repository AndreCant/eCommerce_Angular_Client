import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AppConstants } from './app.constants';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { appReducers } from './reducers/app.reducers';
import { RegistryEffects } from './effects/registry-effects.service';
import { UserEffects } from './effects/user-effects.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { PaymentEffects } from './effects/payment-effects.service';
import { ProductEffects } from './effects/product-effects.service';
import { OrderEffects } from './effects/order-effects.service';
import { UserRegistryEffects } from './effects/userRegistry-effects.service';
import { HttpLoaderFactory, getToken } from './utility/Utility';
import { CategoryEffects } from './effects/category-effects.service';
import { BannerEffects } from './effects/banner-effects.service';
import { LayoutModule } from './module/layout/layout.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([RegistryEffects, UserEffects, PaymentEffects, ProductEffects, OrderEffects, UserRegistryEffects, CategoryEffects, BannerEffects]),
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
        tokenGetter: getToken,
        allowedDomains: [AppConstants.DOMAIN]
      }
    }),

    //https://angular.io/guide/service-worker-config
    ServiceWorkerModule.register('ngsw-worker.js', { 
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
