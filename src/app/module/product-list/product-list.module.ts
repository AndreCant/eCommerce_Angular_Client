import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from 'src/app/components/products/product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { ProductListRoutingModule } from './product-list-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ProductModule } from '../product/product.module';
import { HttpLoaderFactory } from 'src/app/utility/Utility';

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    RouterModule,
    ProductListRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    ProductModule
  ]
})
export class ProductListModule { }
