import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  @Output()
  chooseTabEvent: EventEmitter<string>;

  constructor() { 
    this.chooseTabEvent = new EventEmitter();
  }

  ngOnInit(): void {
  }

  users(){
    this.chooseTabEvent.emit(AppConstants.USERS);
  }

  products(){
    this.chooseTabEvent.emit(AppConstants.PRODUCTS);
  }

}
