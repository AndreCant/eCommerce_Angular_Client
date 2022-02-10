import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AddPaymentComponent } from 'src/app/components/commons/add-payment/add-payment.component';
import { HttpLoaderFactory } from 'src/app/utility/Utility';

@NgModule({
  declarations: [AddPaymentComponent],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    ReactiveFormsModule
  ],
  exports: [AddPaymentComponent]
})
export class AddPaymentModule { }
