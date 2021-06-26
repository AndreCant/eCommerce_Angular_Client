import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ERegistryActions, ShowAction, ShowSuccessAction, UpdateRegistryAction, UpdateRegistrySuccessAction } from '../actions/registry.actions';
import { Registry } from '../model/Registry';
import { RegistryService } from '../services/registry.service';

@Injectable()
export class RegistryEffects {

  constructor(private actions$: Actions, private registryService: RegistryService) {}

  loadRegistry$: Observable<Action> = createEffect(() => {
    return this.actions$
    .pipe(
      ofType<ShowAction>(ERegistryActions.SHOW),
      switchMap(() => this.registryService.getRegistry()),
      switchMap((registryResp: Registry) => of(new ShowSuccessAction(registryResp))))
    
  });

  updateRegistry$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<UpdateRegistryAction>(ERegistryActions.UPDATE),
      switchMap((registry) => this.registryService.updateRegistry(registry.payload)),
      switchMap((registryResp: Registry) => of(new UpdateRegistrySuccessAction(registryResp)))
  )});
}
