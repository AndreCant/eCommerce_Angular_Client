import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CreateAction, CreateSuccessAction, DeleteAction, DeleteSuccessAction, EProductActions, ShowAllAction, UpdateAction, UpdateSuccessAction } from '../actions/product.actions';
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

  createProduct$: Observable<Action> = createEffect(() => {
    return this.actions$
    .pipe(
      ofType<CreateAction>(EProductActions.CREATE),
      switchMap((action) => this.productService.createProduct(action.payload)),
      switchMap((resp) => of(new CreateSuccessAction(resp))))
  });

  deleteProduct$: Observable<Action> = createEffect(() => {
    return this.actions$
    .pipe(
      ofType<DeleteAction>(EProductActions.DELETE),
      switchMap((action) => this.productService.deleteProduct(action.payload)),
      switchMap((resp: string) => of(new DeleteSuccessAction(resp))))
  });

  updateProduct$: Observable<Action> = createEffect(() => {
    return this.actions$
    .pipe(
      ofType<UpdateAction>(EProductActions.UPDATE),
      switchMap((action) => this.productService.updateProduct(action.id, action.payload)),
      switchMap((resp: string) => of(new UpdateSuccessAction(resp))))
  });
}
