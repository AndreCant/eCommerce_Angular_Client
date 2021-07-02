import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreateAction, EPaymentActions } from 'src/app/actions/payment.actions';
import { Payment } from 'src/app/model/Payment';
import { IAppState } from 'src/app/state/app.states';
import { CustomValidators } from 'src/app/utility/CustomValidators';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {

  @Output()
  paymentEvent: EventEmitter<boolean>;

  paymentForm: FormGroup;
  destroyed$ = new Subject<boolean>();
  isButtonDisabled: boolean = false;

  constructor(private fb: FormBuilder, private store: Store<IAppState>, updates$: Actions, private toastr: ToastrService, private translate$: TranslateService ) { 
    let success: string;
    let detail: string;
    this.paymentEvent = new EventEmitter();

    this.translate$.get("payment.message").subscribe(labels => {
      success = labels.success;
      detail = labels.detail;
    });
    
    updates$.pipe(
      ofType(EPaymentActions.CREATE_SUCCESS),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.enableButton();
      this.toastr.success(detail, success);
      this.close();
    });
    
    this.paymentForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      number: [null, [Validators.required, CustomValidators.validateCardNumber]],
      month: [null, [Validators.required, CustomValidators.validateMonth]],
      year: [null, [Validators.required, CustomValidators.validateYear]],
      cvv: [null, [Validators.required, CustomValidators.validateCvv]]
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  savePayment(){
    this.disableButton();
    this.store.dispatch(new CreateAction(this.paymentForm.value));
  }

  disableButton(){
    this.isButtonDisabled = true;
  }

  enableButton(){
    this.isButtonDisabled = false;
  }

  close(){
    this.paymentEvent.emit(true);
    this.paymentForm.reset();
  }

}
