import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { CreateAction, CreateSuccessAction, DeleteAction, DeleteSuccessAction, EBannerActions, ShowAction, ShowAllAction, ShowAllSuccessAction, ShowSuccessAction, UpdateAction, UpdateSuccessAction } from "../actions/banner.actions";
import { Banner } from "../model/Banner";
import { BannerService } from "../services/banner.service";

@Injectable()
export class BannerEffects {

  constructor(private actions$: Actions, private bannerService: BannerService) {}

  loadBanners$: Observable<Action> = createEffect(() => {
    return this.actions$
    .pipe(
      ofType<ShowAllAction>(EBannerActions.SHOW_ALL),
      switchMap(() => this.bannerService.getBanners()),
      switchMap((bannerResp: Banner[]) => of(new ShowAllSuccessAction(bannerResp))))
  });

  loadBannersByName$: Observable<Action> = createEffect(() => {
    return this.actions$
    .pipe(
      ofType<ShowAction>(EBannerActions.SHOW),
      switchMap((name) => this.bannerService.getBannerByName(name.payload)),
      switchMap((bannerResp: Banner[]) => of(new ShowSuccessAction(bannerResp))))
  });

  createBanner$: Observable<Action> = createEffect(() => {
    return this.actions$
    .pipe(
      ofType<CreateAction>(EBannerActions.CREATE),
      switchMap((action) => this.bannerService.createBanner(action.payload)),
      switchMap((response) => of(new CreateSuccessAction(response)))
      )
  });

  updateBanner$: Observable<Action> = createEffect(() => {
    return this.actions$
    .pipe(
      ofType<UpdateAction>(EBannerActions.UPDATE),
      switchMap((action) => this.bannerService.updateBanner(action.payload, action.id)),
      switchMap((response) => of(new UpdateSuccessAction(response)))
      )
  });

  deleteBanner$: Observable<Action> = createEffect(() => {
    return this.actions$
    .pipe(
      ofType<DeleteAction>(EBannerActions.DELETE),
      switchMap((action) => this.bannerService.deleteBanner(action.id)),
      switchMap((response) => of(new DeleteSuccessAction(response)))
      )
  });
}