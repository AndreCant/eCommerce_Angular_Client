import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from 'src/app/components/admin-page/admin-layout/admin-layout.component';
import { AsideComponent } from 'src/app/components/admin-page/aside/aside.component';
import { ContentComponent } from 'src/app/components/admin-page/content/content.component';
import { ProductFormComponent } from 'src/app/components/admin-page/product-form/product-form.component';
import { BannerFormComponent } from 'src/app/components/admin-page/banner-form/banner-form.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpLoaderFactory } from 'src/app/utility/Utility';


@NgModule({
  declarations: [
    AdminLayoutComponent, 
    AsideComponent, 
    ContentComponent, 
    ProductFormComponent,
    BannerFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    AngularEditorModule,
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
export class AdminModule { }
