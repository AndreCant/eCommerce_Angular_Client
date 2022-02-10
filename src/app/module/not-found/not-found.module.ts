import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from 'src/app/components/commons/not-found-page/not-found-page.component';
import { RouterModule } from '@angular/router';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/utility/Utility';

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    NotFoundRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
  ]
})
export class NotFoundModule { }
