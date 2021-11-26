import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreateAction, EProductActions } from 'src/app/actions/product.actions';
import { Product } from 'src/app/model/Product';
import { IAppState } from 'src/app/state/app.states';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Output()
  productEvent: EventEmitter<boolean>;

  productForm: FormGroup;
  isButtonDisabled: boolean = false;
  destroyed$ = new Subject<boolean>();

  constructor(private fb: FormBuilder, private store: Store<IAppState>, updates$: Actions, private toastr: ToastrService) { 
    this.productEvent = new EventEmitter();

    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      type: ['shoes', [Validators.required]],
      subType: ['', [Validators.required]],
      gender: ['M', [Validators.required]],
      collection: ['fall/winter', [Validators.required]],
      color: ['', [Validators.required]],
      material: ['', [Validators.required]],
      short: ['', [Validators.required]],
      long: ['', [Validators.required]],
      small: [false, []],
      medium: [false, []],
      large: [false, []],
      xlarge: [false, []],
      img: ['', []],
    });

    updates$.pipe(
      ofType(EProductActions.CREATE_SUCCESS),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.enableButton();
      this.toastr.success('', 'OK');
      this.close();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  disableButton(){
    this.isButtonDisabled = true;
  }

  enableButton(){
    this.isButtonDisabled = false;
  }

  close(){
    this.productEvent.emit(true);
    this.productForm.reset();
  }

  saveProduct(){
    this.disableButton();

    const values = this.productForm.value;
    let sizes = [];
    let size = '';

    if(values.small) sizes.push('S');
    if(values.medium) sizes.push('M');
    if(values.large) sizes.push('L');
    if(values.xlarge) sizes.push('XL');
    if(sizes.length) size = sizes.join(',');

    const product: Product = {
      id: 0,
      name: values.name,
      short_description: values.short,
      description: values.long,
      price: values.price,
      gender: values.gender,
      type: values.type,
      sub_type: values.subType,
      size_available: size,
      color: values.color,
      material: values.material,
      collection: values.collection,
      previewUrl: values.img
    }

    this.store.dispatch(new CreateAction(product));
  }

}
