import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from 'src/app/components/profile-page/profile/profile.component';
import { RouterModule } from '@angular/router';
import { ProfileRoutingModule } from './profile-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { RegistryFormComponent } from 'src/app/components/profile-page/registry-form/registry-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPaymentModule } from '../add-payment/add-payment.module';
import { AddPaymentComponent } from 'src/app/components/commons/add-payment/add-payment.component';
import { HttpLoaderFactory } from 'src/app/utility/Utility';

@NgModule({
  declarations: [ProfileComponent, RegistryFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    ProfileRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    AddPaymentModule
  ]
})
export class ProfileModule { }
