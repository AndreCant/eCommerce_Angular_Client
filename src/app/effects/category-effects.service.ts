import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { CreateAction, CreateSuccessAction, DeleteAction, DeleteSuccessAction, ECategoryActions, ShowAllAction, ShowAllSuccessAction, UpdateAction, UpdateSuccessAction } from "../actions/category.actions";
import { Category } from "../model/Category";
import { CategoryService } from "../services/category.service";

@Injectable()
export class CategoryEffects {

  constructor(private actions$: Actions, private categoryService: CategoryService) {}

  loadCategories$: Observable<Action> = createEffect(() => {
    return this.actions$
    .pipe(
      ofType<ShowAllAction>(ECategoryActions.SHOW_ALL),
      switchMap(() => this.categoryService.getCategories()),
      switchMap((categoryResp: Category[]) => of(new ShowAllSuccessAction(categoryResp))))
  });

  createCategory$: Observable<Action> = createEffect(() => {
    return this.actions$
    .pipe(
      ofType<CreateAction>(ECategoryActions.CREATE),
      switchMap((action) => this.categoryService.createCategory(action.payload)),
      switchMap((response) => of(new CreateSuccessAction(response)))
      )
  });

  updateCategory$: Observable<Action> = createEffect(() => {
    return this.actions$
    .pipe(
      ofType<UpdateAction>(ECategoryActions.UPDATE),
      switchMap((action) => this.categoryService.updateCategory(action.payload, action.id)),
      switchMap((response) => of(new UpdateSuccessAction(response)))
      )
  });

  deleteCategory$: Observable<Action> = createEffect(() => {
    return this.actions$
    .pipe(
      ofType<DeleteAction>(ECategoryActions.DELETE),
      switchMap((action) => this.categoryService.deleteCategory(action.id)),
      switchMap((response) => of(new DeleteSuccessAction(response)))
      )
  });
}