import { Component, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ShowUserAction } from 'src/app/actions/user.actions';
import { AppConstants } from 'src/app/app.constants';
import { Product } from 'src/app/model/Product';
import { User } from 'src/app/model/User';
import { selectorUser } from 'src/app/selectors/user.selector';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { IAppState } from 'src/app/state/app.states';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user$?: Observable<User>;
  products$?: Product[];
  currLanguage: any;
  Object = Object;

  languages: any = {
    it: {
      flag: AppConstants.IT_FLAG_PATH,
      acronym: "ITA"
    },
    en: {
      flag: AppConstants.US_FLAG_PATH,
      acronym: "EN/US"
    }
  }

  constructor(private authService: AuthService, private translate: TranslateService, private store: Store<IAppState>, private service: ProductService) {
    this.user$ = this.store.pipe(select(selectorUser));
    let lang: string | null = localStorage.getItem(AppConstants.LANG_STORAGE);

    if (lang) {
      this.setLanguage(lang);
    }else{
      this.setLanguage(this.translate.getDefaultLang());
    }
  }

  get prodWishlist(){
    let wishlist = window.localStorage.getItem(AppConstants.WISHLIST);

    if (wishlist) return JSON.parse(wishlist).products;
    return [];
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

  setLanguage(lang: string){
    switch (lang) {
      case "it": this.currLanguage = this.languages.it;
      break;
      default: this.currLanguage = this.languages.en;
        break;
    }
  }

  ngOnInit(): void {
    this.getUser();
  }

  logout(){
    this.authService.logout();
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  changeLanguage(lang: string){
    this.translate.use(lang);
    this.setLanguage(lang);
    localStorage.setItem(AppConstants.LANG_STORAGE, lang);
  }

  getUser(){
    this.store.dispatch(new ShowUserAction());
  }

  showWishlist(){
    this.showOverlay();
    this.getProducts(AppConstants.WISHLIST);
    const wishlist = document.getElementById('offcanvas-wishlist');
    if (wishlist) wishlist.classList.add('offcanvas-open');
  }

  hideWishlist(){
    this.hideOverlay();
    const wishlist = document.getElementById('offcanvas-wishlist');
    if (wishlist) wishlist.classList.remove('offcanvas-open');
    this.products$ = [];
  }

  showCart(){
    this.showOverlay();
    this.getProducts(AppConstants.CART);
    const cart = document.getElementById('offcanvas-cart');
    if (cart) cart.classList.add('offcanvas-open');
  }

  hideCart(){
    this.hideOverlay();
    const cart = document.getElementById('offcanvas-cart');
    if (cart) cart.classList.remove('offcanvas-open');
    this.products$ = [];
  }

  showOverlay(){
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.style.display = 'block';
  }

  hideOverlay(){
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.style.display = 'none';
  }

  getProducts(type: string){
    const item = window.localStorage.getItem(type);

    if (item) {
      let productIds = type === AppConstants.WISHLIST ? JSON.parse(item).products : Object.keys(JSON.parse(item).products);

      if (productIds) this.service.getProductsByIds(`${AppConstants.SERVICES_BASE_URL}/product?id=[${productIds}]`).subscribe(products => {
        this.products$ = products;
      });
    }
  }

  removeWishList(productId: number){
    let wishlist = window.localStorage.getItem(AppConstants.WISHLIST);

    if (wishlist && this.products$) {
      let products = JSON.parse(wishlist).products;
      let userId = JSON.parse(wishlist).userId;

      products.splice(products.indexOf(productId), 1);

      window.localStorage.setItem(
        AppConstants.WISHLIST, 
        JSON.stringify({
          userId: userId,
          products: products
        })
      );

      this.hideWishlist();
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

      this.getProducts(AppConstants.CART);
      this.hideCart();
    }
  }

}
