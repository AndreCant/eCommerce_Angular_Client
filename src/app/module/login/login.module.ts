import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from 'src/app/components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpLoaderFactory } from 'src/app/utility/Utility';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    LoginRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    FormsModule
  ]
})
export class LoginModule { }
