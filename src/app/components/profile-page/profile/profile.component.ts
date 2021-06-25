import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShowAction, UpdateRegistryAction } from 'src/app/actions/registry.actions';
import { ShowUserAction } from 'src/app/actions/user.actions';
import { Registry } from 'src/app/model/Registry';
import { User } from 'src/app/model/User';
import { selectorRegistry } from 'src/app/selectors/registry.selector';
import { selectorUser } from 'src/app/selectors/user.selector';
import { IAppState } from 'src/app/state/app.states';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  registry$?: Observable<Registry>;
  user$?: Observable<User>;

  constructor(private store: Store<IAppState>) {
    this.user$ = this.store.pipe(select(selectorUser));
    this.registry$ = this.store.pipe(select(selectorRegistry));
  }

  ngOnInit(): void {
    this.getUser();
    this.getRegistry();
  }

  getRegistry() {
    this.store.dispatch(new ShowAction());
  }

  getUser(){
    this.store.dispatch(new ShowUserAction());
  }

}
