import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EUserRegistryActions, ShowUsersAction, ShowUsersSuccessAction } from '../actions/userRegistry.actions';
import { UserRegistry } from '../model/UserRegistry';
import { AdminService } from '../services/admin.service';

@Injectable()
export class UserRegistryEffects {

  constructor(private actions$: Actions, private adminService: AdminService) {}

  loadUserRegistry$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<ShowUsersAction>(EUserRegistryActions.SHOW_USERS),
      switchMap(() => this.adminService.getUserRegistries()),
      switchMap((userRegistryResp: UserRegistry[]) =>
        of(new ShowUsersSuccessAction(userRegistryResp))
      )
    );
  });
}
