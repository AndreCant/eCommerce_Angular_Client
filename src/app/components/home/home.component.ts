import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ShowAllAction } from 'src/app/actions/product.actions';
import { AppConstants } from 'src/app/app.constants';
import { Banner } from 'src/app/model/Banner';
import { Product } from 'src/app/model/Product';
import { selectorProduct } from 'src/app/selectors/product.selector';
import { BannerService } from 'src/app/services/banner.service';
import { IAppState } from 'src/app/state/app.states';
import { getUserId } from 'src/app/utility/Utitity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products$?: Observable<Product[]>;
  bannerCarousel?: Banner;
  bannerMen?: Banner;
  bannerWomen?: Banner;
  bannerKids?: Banner;
  bannerShipping?: Banner;
  bannerReturns?: Banner;
  bannerSecure?: Banner;
  bannerSupport?: Banner;

  constructor(private store: Store<IAppState>, private toastr: ToastrService, private service: BannerService) { 
    this.products$ = this.store.pipe(select(selectorProduct));
  }

  ngOnInit(): void {
    this.getBanners();
    this.store.dispatch(new ShowAllAction(`${AppConstants.SERVICES_BASE_URL}/products?gender=M&type=shoes&size=[]&subtype=[]&price=[]`));
  }

  get prodWishlist(){
    let wishlist = window.localStorage.getItem(AppConstants.WISHLIST);

    if (wishlist) return JSON.parse(wishlist).products;
    return [];
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

  getBanners(){
    this.service.getBannerByName('carousel').subscribe(banner => {
      this.bannerCarousel = banner[0];
    });

    this.service.getBannerByName('men').subscribe(banner => {
      this.bannerMen = banner[0];
    });

    this.service.getBannerByName('women').subscribe(banner => {
      this.bannerWomen = banner[0];
    });

    this.service.getBannerByName('kids').subscribe(banner => {
      this.bannerKids = banner[0];
    });

    this.service.getBannerByName('shipping').subscribe(banner => {
      this.bannerShipping = banner[0];
    });

    this.service.getBannerByName('returns').subscribe(banner => {
      this.bannerReturns = banner[0];
    });

    this.service.getBannerByName('secure').subscribe(banner => {
      this.bannerSecure = banner[0];
    });

    this.service.getBannerByName('support').subscribe(banner => {
      this.bannerSupport = banner[0];
    });
  }

}
