import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from 'src/app/app.constants';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

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

  constructor(private authService: AuthService, private translate: TranslateService) {
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

  ngOnInit(): void {}

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

}
