import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreateAction, EOrderActions } from 'src/app/actions/order.actions';
import { ShowAllAction } from 'src/app/actions/payment.actions';
import { AppConstants } from 'src/app/app.constants';
import { Order } from 'src/app/model/Order';
import { OrderLineItem } from 'src/app/model/OrderLineItem';
import { Payment } from 'src/app/model/Payment';
import { Product } from 'src/app/model/Product';
import { selectorPayment } from 'src/app/selectors/payment.selector';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { IAppState } from 'src/app/state/app.states';
import { getUserId } from 'src/app/utility/Utitity';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @ViewChildren('paymentSelect') paymentSelect?: QueryList<ElementRef>;

  payments$?: Observable<Payment[]>;
  addPayment: boolean = false;
  selectedPayment?: number;
  products$?: Product[];
  destroyed$ = new Subject<boolean>();

  constructor(private store: Store<IAppState>, private productService: ProductService, private toastr: ToastrService, updates$: Actions) {
    this.payments$ = this.store.pipe(select(selectorPayment));

    updates$.pipe(
      ofType(EOrderActions.CREATE_SUCCESS),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      window.localStorage.removeItem(AppConstants.CART);
      this.toastr.success('Order completed successfully!', 'Success!');
      setTimeout(() => {window.location.replace('profile');}, 500);
      
    });
  }

  get prodCart(){
    let cart = window.localStorage.getItem(AppConstants.CART);

    if (cart) return JSON.parse(cart).products;
    return {};
  }

  get subTotal(){
    let total = 0;

    if(this.products$ && this.prodCart){
      Object.keys(this.prodCart).forEach(productId => {
        const price = this.products$?.find(product => { return product.id == Number(productId) })?.price;
        total += Number(price) * this.prodCart[productId].quantity;
      });
    }
    return total.toFixed(2);
  }

  ngOnInit(): void {
    this.getPayments();
    this.getProducts(AppConstants.CART);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  getPayments(){
    this.store.dispatch(new ShowAllAction());
    this.setDefaultChecked();
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

  setPaymentMethod(event: any){
    this.selectedPayment = event.target.id;

    this.paymentSelect?.forEach(elem => {
      if(elem.nativeElement.id != this.selectedPayment) elem.nativeElement.checked = false;
    });
  }

  setDefaultChecked(){
    setTimeout(() => {
      let isSet = false;
      this.paymentSelect?.forEach(elem => {
        if(!isSet) {
          elem.nativeElement.checked = true;
          this.selectedPayment = elem.nativeElement.id;
          isSet = true;
        }
        return;
      });
    }, 500);
  }

  getProducts(type: string){
    const item = window.localStorage.getItem(type);

    if (item) {
      let productIds = type === AppConstants.WISHLIST ? JSON.parse(item).products : Object.keys(JSON.parse(item).products);

      if (productIds) this.productService.getProductsByIds(`${AppConstants.SERVICES_BASE_URL}/product?id=[${productIds}]`).subscribe(products => {
        this.products$ = products;
      });
    }
  }

  removeCart(productId: number){
    let cart = window.localStorage.getItem(AppConstants.CART);

    if (cart && this.products$) {
      let products = JSON.parse(cart).products;
      let userId = JSON.parse(cart).userId;

      delete products[productId];

      window.localStorage.setItem(
        AppConstants.CART, 
        JSON.stringify({
          userId: userId,
          products: products
        })
      );
    }

    this.getProducts(AppConstants.CART);
  }

  checkout(){
    if(Object.keys(this.prodCart).length && this.selectedPayment){
      let order: Order = {};
      let items: OrderLineItem[] = [];
  
      Object.keys(this.prodCart).forEach((productId: any) => {
        items.push({
          product_id: Number(productId),
          size: this.prodCart[productId].size,
          quantity: this.prodCart[productId].quantity
        });
      });

      order.payment_id = Number(this.selectedPayment);
      order.items = items;
      
      this.store.dispatch(new CreateAction(order));
    }
  }
}
