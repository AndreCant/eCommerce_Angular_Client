import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from 'src/app/components/checkout/checkout.component';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AddPaymentModule } from '../add-payment/add-payment.module';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { HttpLoaderFactory } from 'src/app/utility/Utility';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    CheckoutRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    AddPaymentModule
  ]
})
export class CheckoutModule { }
