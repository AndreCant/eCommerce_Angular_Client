import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreateAction, EProductActions, UpdateAction } from 'src/app/actions/product.actions';
import { Category } from 'src/app/model/Category';
import { Product } from 'src/app/model/Product';
import { CategoryService } from 'src/app/services/category.service';
import { IAppState } from 'src/app/state/app.states';
import { getSize } from 'src/app/utility/Utility';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input()
  product?: Product;

  @Output()
  productEvent: EventEmitter<boolean>;

  productForm: FormGroup;
  isButtonDisabled: boolean = false;
  destroyed$ = new Subject<boolean>();
  categories$? : Observable<Category[]>;

  constructor(private fb: FormBuilder, private store: Store<IAppState>, updates$: Actions, private toastr: ToastrService, private service: CategoryService) { 
    this.productEvent = new EventEmitter();

    this.productForm = this.fb.group({
      id: [0, []],
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

    updates$.pipe(
      ofType(EProductActions.UPDATE_SUCCESS),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.enableButton();
      this.toastr.success('', 'OK');
      this.close();
    });
  }

  ngOnInit(): void {
    if(this.product) this.populateForm();
    this.categories$ = this.service.getCategories();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  populateForm(){
    this.productForm = this.fb.group({
      id: [this.product?.id, []],
      name: [this.product?.name, [Validators.required]],
      price: [this.product?.price, [Validators.required]],
      type: [this.product?.type, [Validators.required]],
      subType: [this.product?.sub_type, [Validators.required]],
      gender: [this.product?.gender, [Validators.required]],
      collection: [this.product?.collection, [Validators.required]],
      color: [this.product?.color, [Validators.required]],
      material: [this.product?.material, [Validators.required]],
      short: [this.product?.short_description, [Validators.required]],
      long: [this.product?.description, [Validators.required]],
      small: [this.product?.size_available?.includes('S'), []],
      medium: [this.product?.size_available?.includes('M'), []],
      large: [this.product?.size_available?.includes('L'), []],
      xlarge: [this.product?.size_available?.includes('XL'), []],
      img: [this.product?.previewUrl, []]
    });
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
      id: values.id,
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

    if (this.product) {
      this.store.dispatch(new UpdateAction(product, product.id));
    }else{
      this.store.dispatch(new CreateAction(product));
    }
  }

  getSize(size: any, gender: any, type: any){
    return getSize(size, gender, type);
  }
}
