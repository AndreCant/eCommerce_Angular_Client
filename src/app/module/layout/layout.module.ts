import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/components/commons/navbar/navbar.component';
import { FooterComponent } from 'src/app/components/commons/footer/footer.component';
import { MegaMenuComponent } from 'src/app/components/commons/mega-menu/mega-menu.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpLoaderFactory } from 'src/app/utility/Utility';


@NgModule({
  declarations: [
    NavbarComponent, 
    FooterComponent, 
    MegaMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
  ],
  exports: [
    NavbarComponent, 
    FooterComponent, 
    MegaMenuComponent
  ],
})
export class LayoutModule { }
