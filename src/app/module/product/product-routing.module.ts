import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from 'src/app/components/products/product-page/product-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: ProductPageComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductRoutingModule { }
