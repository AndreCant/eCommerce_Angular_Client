import { Component, OnInit } from '@angular/core';
import { ShowAction } from 'src/app/actions/banner.actions';
import { Banner } from 'src/app/model/Banner';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  bannerLogo?: Banner;
  bannerPay?: Banner;
  bannerAppStore?: Banner;
  bannerPlayStore?: Banner;
  bannerNewsletter?: Banner;

  constructor(private service: BannerService) {}

  ngOnInit(): void {
    this.getBanners();
  }

  getBanners(){
    this.service.getBannerByName('logo').subscribe(banner => {
      this.bannerLogo = banner[0];
    });

    this.service.getBannerByName('payment').subscribe(banner => {
      this.bannerPay = banner[0];
    });

    this.service.getBannerByName('appStore').subscribe(banner => {
      this.bannerAppStore = banner[0];
    });

    this.service.getBannerByName('googlePlay').subscribe(banner => {
      this.bannerPlayStore = banner[0];
    });

    this.service.getBannerByName('newsletter').subscribe(banner => {
      this.bannerNewsletter = banner[0];
    });
  }
}
