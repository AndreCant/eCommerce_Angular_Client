import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationComponent } from 'src/app/components/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpLoaderFactory } from 'src/app/utility/Utility';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    RouterModule,
    RegistrationRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    ReactiveFormsModule
  ]
})
export class RegistrationModule { }
