import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShowAllAction } from 'src/app/actions/product.actions';
import { AppConstants } from 'src/app/app.constants';
import { ProductsFilter } from 'src/app/model/ProductsFilter';
import { selectorProduct } from 'src/app/selectors/product.selector';
import { ProductService } from 'src/app/services/product.service';
import { IAppState } from 'src/app/state/app.states';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  gender?: string | null;
  type?: string | null;
  subtype?: string | null;
  products$?: Observable<ProductsFilter[]>;

  size: string[] = [];
  subtypes: string[] = [];
  price: number[] = [];

  constructor(private activatedroute: ActivatedRoute, private store: Store<IAppState>, private ser: ProductService) {
    this.products$ = this.store.pipe(select(selectorProduct));
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      if(this.subtypes.length || this.size.length || this.price.length) window.location.reload();
      this.gender = params.get('gender');  
      this.type = params.get('type');
      this.subtype = params.get('subtype') !== 'all' ? params.get('subtype') : '';
      if(this.subtype) this.subtypes.push(this.subtype);

      this.getProducts();
    });
  }

  get url(){
    return `${AppConstants.SERVICES_BASE_URL}/products?gender=${this.gender}&type=${this.type}&size=${JSON.stringify(this.size)}&subtype=${JSON.stringify(this.subtypes)}&price=${JSON.stringify(this.price)}`;
  }

  filter(event: any){
    const filter = event.target.id;
    const area = event.target.name;
    const isChecked = event.target.checked;
    
    switch (area) {
      case "subtype": 
        if (isChecked) {
          this.subtypes.push(filter);
        } else {
            this.subtypes.splice(this.subtypes.indexOf(filter), 1);
        }
      break;

      case "price":
        if (isChecked) {
          this.price.push(filter);
        } else {
            this.price.splice(this.price.indexOf(filter), 1);
        }
      break;

      case "size":
        if (isChecked) {
          this.size.push(filter);
        } else {
            this.size.splice(this.size.indexOf(filter), 1);
        }
      break;
    
      default:
      break;
    }

    this.getProducts();
  }

  getProducts(){
    this.store.dispatch(new ShowAllAction(this.url));
  }
}
