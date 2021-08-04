import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ShowUserAction } from 'src/app/actions/user.actions';
import { AppConstants } from 'src/app/app.constants';
import { User } from 'src/app/model/User';
import { selectorUser } from 'src/app/selectors/user.selector';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IAppState } from 'src/app/state/app.states';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user$?: Observable<User>;
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

  constructor(private authService: AuthService, private translate: TranslateService, private store: Store<IAppState>) {
    this.user$ = this.store.pipe(select(selectorUser));
    let lang: string | null = localStorage.getItem(AppConstants.LANG_STORAGE);

    if (lang) {
      this.setLanguage(lang);
    }else{
      this.setLanguage(this.translate.getDefaultLang());
    }
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
    const wishlist = document.getElementById('offcanvas-wishlist');
    if (wishlist) wishlist.classList.add('offcanvas-open');
  }

  hideWishlist(){
    this.hideOverlay();
    const wishlist = document.getElementById('offcanvas-wishlist');
    if (wishlist) wishlist.classList.remove('offcanvas-open');
  }

  showCart(){
    this.showOverlay();
    const cart = document.getElementById('offcanvas-cart');
    if (cart) cart.classList.add('offcanvas-open');
  }

  hideCart(){
    this.hideOverlay();
    const cart = document.getElementById('offcanvas-cart');
    if (cart) cart.classList.remove('offcanvas-open');
  }

  showOverlay(){
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.style.display = 'block';
  }

  hideOverlay(){
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.style.display = 'none';
  }

}
