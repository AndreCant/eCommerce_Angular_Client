import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.css']
})
export class MegaMenuComponent implements OnInit {

  @Input()
  gender?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
