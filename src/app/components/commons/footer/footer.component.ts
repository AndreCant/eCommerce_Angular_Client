import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShowAction, ShowAllAction } from 'src/app/actions/banner.actions';
import { Banner } from 'src/app/model/Banner';
import { selectorBanner } from 'src/app/selectors/banner.selector';
import { BannerService } from 'src/app/services/banner.service';
import { IAppState } from 'src/app/state/app.states';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  banners$?: Observable<Banner[]>;
  bannerLogo?: Banner;
  bannerPay?: Banner;
  bannerAppStore?: Banner;
  bannerPlayStore?: Banner;
  bannerNewsletter?: Banner;

  constructor(private store: Store<IAppState>) {
    this.banners$ = this.store.pipe(select(selectorBanner));
  }

  ngOnInit(): void {
    this.store.dispatch(new ShowAllAction());
    this.setBanners();
  }

  setBanners(){
    this.banners$?.subscribe(banners => {
      if (banners.length) {
        banners.forEach(banner => {
          switch (banner.name) {
            case 'logo': this.bannerLogo = banner;
            break;
            case 'payment': this.bannerPay = banner;
            break;
            case 'appStore': this.bannerAppStore = banner;
            break;
            case 'googlePlay': this.bannerPlayStore = banner;
            break;
            case 'newsletter': this.bannerNewsletter = banner;
            break;
          }
        });
      }
    });
  }
}
