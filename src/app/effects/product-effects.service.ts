import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EProductActions, ShowAllAction } from '../actions/product.actions';
import { ShowAllSuccessAction } from '../actions/product.actions';
import { Product } from '../model/Product';
import { ProductService } from '../services/product.service';

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private productService: ProductService) {}

  loadProducts$: Observable<Action> = createEffect(() => {
    return this.actions$
    .pipe(
      ofType<ShowAllAction>(EProductActions.SHOW_ALL),
      switchMap((action) => this.productService.getProducts(action.url)),
      switchMap((productsResp: Product[]) => of(new ShowAllSuccessAction(productsResp))))
  });
}
