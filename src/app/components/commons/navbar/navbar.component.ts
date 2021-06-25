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
    console.log(this.translate.currentLang);

    this.setLanguage(this.translate.currentLang);
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
  }

}
