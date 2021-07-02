import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeleteAction, ShowAllAction } from 'src/app/actions/payment.actions';
import { ShowAction } from 'src/app/actions/registry.actions';
import { ShowUserAction } from 'src/app/actions/user.actions';
import { Payment } from 'src/app/model/Payment';
import { Registry } from 'src/app/model/Registry';
import { User } from 'src/app/model/User';
import { selectorPayment } from 'src/app/selectors/payment.selector';
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
  payments$?: Observable<Payment[]>;
  addPayment: boolean = false;

  constructor(private store: Store<IAppState>) {
    this.user$ = this.store.pipe(select(selectorUser));
    this.registry$ = this.store.pipe(select(selectorRegistry));
    this.payments$ = this.store.pipe(select(selectorPayment));
  }

  ngOnInit(): void {
    this.getUser();
    this.getRegistry();
    this.getPayments();
  }

  getRegistry() {
    this.store.dispatch(new ShowAction());
  }

  getUser(){
    this.store.dispatch(new ShowUserAction());
  }

  getPayments(){
    this.store.dispatch(new ShowAllAction());
  }

  showPayment(){
    this.addPayment = true;
  }

  paymentEventHandler(event: boolean){
    if(event) {
      this.addPayment = false;
      this.getPayments();
    }
  }

  deletePayment(id: number | undefined){
    if (id) {
      this.store.dispatch(new DeleteAction(id));
      this.getPayments();
    }
  }

}
