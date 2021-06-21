import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ERegistryActions, ShowAction, ShowSuccessAction, UpdateRegistryAction, UpdateRegistrySuccessAction } from '../actions/registry.actions';
import { Registry } from '../model/Registry';
import { RegistryService } from '../services/registry.service';

@Injectable({
  providedIn: 'root'
})
export class RegistryEffects {

  constructor(private actions$: Actions, private registryService: RegistryService) {}

  loadRegistry$: Observable<Action> = createEffect(() => {
    return this.actions$
    .pipe(
      ofType<ShowAction>(ERegistryActions.SHOW),
      switchMap(() => this.registryService.getRegistry()),
      switchMap((registryResp: Registry) => of(new ShowSuccessAction(registryResp))))
    .pipe(
      ofType<UpdateRegistryAction>(ERegistryActions.UPDATE),
      switchMap((registry: Registry) => this.registryService.updateRegistry(registry)),
      switchMap((registryResp: Registry) => of(new UpdateRegistrySuccessAction(registryResp))));
  });
}
