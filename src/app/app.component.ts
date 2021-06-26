import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eCommerceAngularClient';

  constructor(public translate: TranslateService){
    this.setLang();
  }

  setLang(){
    const lang : string | null = localStorage.getItem(AppConstants.LANG_STORAGE);

    if (!lang) {
      let browserLang : string = this.translate.getBrowserLang();

      this.translate.addLangs(['en', 'it']);
      this.translate.use(browserLang);
      localStorage.setItem(AppConstants.LANG_STORAGE, browserLang);
    }else{
      this.translate.use(lang);
    }
  }
}
