import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/Category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.css']
})
export class MegaMenuComponent implements OnInit {

  categories$? : Observable<Category[]>;

  @Input()
  gender?: string;

  constructor(private service: CategoryService) {
    this.categories$ = this.service.getCategories();
  }

  ngOnInit(): void {
  }

}
