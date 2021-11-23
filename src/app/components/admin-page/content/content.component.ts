import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from 'src/app/app.constants';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnChanges {

  @Input()
  currentTab?: string;

  fields: string[] = [];

  constructor(private translate$: TranslateService) {}

  ngOnInit(): void {
    this.setData(AppConstants.USERS);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setData(changes.currentTab.currentValue);
  }

  setData(object: string){
    switch (object) {
      case AppConstants.USERS: this.setUserData();
      break;

      case AppConstants.PRODUCTS: console.log('2');
      break;
    }
  }

  setUserData(){
    this.translate$.get('table.users').subscribe(labels => {
      this.fields = [labels.username, labels.email, labels.role];

    });

  }

}
