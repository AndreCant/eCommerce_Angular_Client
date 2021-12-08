import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ShowAllAction } from 'src/app/actions/product.actions';
import { AppConstants } from 'src/app/app.constants';
import { Product } from 'src/app/model/Product';
import { selectorProduct } from 'src/app/selectors/product.selector';
import { IAppState } from 'src/app/state/app.states';
import { getUserId } from 'src/app/utility/Utitity';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  gender?: string | null;
  type?: string | null;
  subtype?: string | null;
  products$?: Observable<Product[]>;

  size: string[] = [];
  subtypes: string[] = [];
  price: number[] = [];

  constructor(private activatedroute: ActivatedRoute, private store: Store<IAppState>, private toastr: ToastrService) {
    this.products$ = this.store.pipe(select(selectorProduct));
  }

  get prodWishlist(){
    let wishlist = window.localStorage.getItem(AppConstants.WISHLIST);

    if (wishlist) return JSON.parse(wishlist).products;
    return [];
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.activatedroute.paramMap.subscribe(params => {
      if(this.subtypes.length || this.size.length || this.price.length) window.location.reload();
      this.gender = params.get('gender');  
      this.type = params.get('type');
      this.subtype = params.get('subtype') !== 'all' ? params.get('subtype') : '';
      if(this.subtype) this.subtypes.push(this.subtype);

      this.getProducts();
    });
  }

  get url(){
    return `${AppConstants.SERVICES_BASE_URL}/products?gender=${this.gender}&type=${this.type}&size=${JSON.stringify(this.size)}&subtype=${JSON.stringify(this.subtypes)}&price=${JSON.stringify(this.price)}`;
  }

  filter(event: any){
    const filter = event.target.id;
    const area = event.target.name;
    const isChecked = event.target.checked;
    
    switch (area) {
      case "subtype": 
        if (isChecked) {
          this.subtypes.push(filter);
        } else {
            this.subtypes.splice(this.subtypes.indexOf(filter), 1);
        }
      break;

      case "price":
        if (isChecked) {
          this.price.push(filter);
        } else {
            this.price.splice(this.price.indexOf(filter), 1);
        }
      break;

      case "size":
        if (isChecked) {
          this.size.push(filter);
        } else {
            this.size.splice(this.size.indexOf(filter), 1);
        }
      break;
    
      default:
      break;
    }

    this.getProducts();
  }

  getProducts(){
    this.store.dispatch(new ShowAllAction(this.url));
  }

  wishlist(productId: any){
    let wishlist = window.localStorage.getItem(AppConstants.WISHLIST);

    if (productId) {
      if (wishlist) {
        let products = JSON.parse(wishlist).products;
        let userId = JSON.parse(wishlist).userId;
  
        if (products.includes(productId)) {
          products.splice(products.indexOf(productId), 1)
        }else{
          products.push(productId);
        }

        window.localStorage.setItem(
          AppConstants.WISHLIST, 
          JSON.stringify({
            userId: userId,
            products: products
          })
        );
      }else{
        window.localStorage.setItem(
          AppConstants.WISHLIST,
          JSON.stringify({
            userId: getUserId(),
            products: [productId]
          })
        );
      }
    }
  }

  cart(productId: any){
    let cart = window.localStorage.getItem(AppConstants.CART);
    let size = 'M';
    let quantity = 1;

    if (productId) {
      if (cart) {
        let products = JSON.parse(cart).products;
        let userId = JSON.parse(cart).userId;
  
        if (Object.keys(products).includes(String(productId))) {
          products[String(productId)].quantity =  Number(products[String(productId)].quantity) + Number(quantity);
        }else{
          products = {...products, [productId]: { size: size, quantity: quantity}  };
        }

        window.localStorage.setItem(
          AppConstants.CART, 
          JSON.stringify({
            userId: userId,
            products: products
          })
        );
      }else{
        window.localStorage.setItem(
          AppConstants.CART,
          JSON.stringify({
            userId: getUserId(),
            products: { [productId]: { size: size, quantity: quantity} }
          })
        );
      }
    }

    this.toastr.success('Product added to cart.', 'Success!');
  }
}
