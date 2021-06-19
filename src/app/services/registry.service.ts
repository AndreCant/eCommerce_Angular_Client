import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShowUserAction } from '../actions/user.actions';
import { AppConstants } from '../app.constants';
import { Registry } from '../model/Registry';
import { User } from '../model/User';
import { selectorUser } from '../selectors/user.selector';
import { IAppState } from '../state/app.states';
import { UserService } from './user.service';

const baseUrl = `${AppConstants.SERVICES_BASE_URL}/registry`;

@Injectable({
  providedIn: 'root'
})
export class RegistryService {
  user$: Observable<User>;

  constructor(private httpClient: HttpClient, private userService: UserService, private store: Store<IAppState>) {
    this.user$ = this.store.pipe(select(selectorUser));
    this.store.dispatch(new ShowUserAction());

    console.log(JSON.stringify(this.user$));
  }

  getRegistry(): Observable<Registry>{
    return this.httpClient.get<Registry>(baseUrl);
  }
}
