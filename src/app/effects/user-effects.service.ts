import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EUserActions, ShowUserAction, ShowUserSuccessAction } from '../actions/user.actions';
import { User } from '../model/User';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserEffects {

  constructor(private actions$: Actions, private userService: UserService) {}

  loadRegistry$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<ShowUserAction>(EUserActions.SHOW_USER),
      switchMap(() => this.userService.getUser()),
      switchMap((userResp: User) =>
        of(new ShowUserSuccessAction(userResp))
      )
    );
  });
}
