import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ShowAllAction } from 'src/app/actions/product.actions';
import { ShowUsersAction } from 'src/app/actions/userRegistry.actions';
import { AppConstants } from 'src/app/app.constants';
import { Product } from 'src/app/model/Product';
import { UserRegistry } from 'src/app/model/UserRegistry';
import { selectorProduct } from 'src/app/selectors/product.selector';
import { selectorUserRegistry } from 'src/app/selectors/userRegistry.selector';
import { IAppState } from 'src/app/state/app.states';
import { getUserId } from 'src/app/utility/Utitity';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnChanges {

  @Input()
  currentTab?: string;

  fields: string[] = [];
  userRegistries$?: Observable<UserRegistry[]>;
  products$?: Observable<Product[]>;
  title?: string;
  labels?: any = {};

  constructor(private translate$: TranslateService, private store: Store<IAppState>) {
    this.userRegistries$ = this.store.pipe(select(selectorUserRegistry));
    this.products$ = this.store.pipe(select(selectorProduct));
    this.setLabels();
  }
  
  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setData(changes.currentTab.currentValue);
  }

  getUserRegistry(){
    this.store.dispatch(new ShowUsersAction);
  }

  getProducts(){
    this.store.dispatch(new ShowAllAction(`${AppConstants.SERVICES_BASE_URL}/products`));
  }

  setLabels(){
    this.translate$.get('table').subscribe(objects => {
      let fields : any = [];

      Object.keys(objects).forEach(obj => {

        switch (obj) {
          case AppConstants.USERS: fields = [objects[obj].username, objects[obj].email, objects[obj].role, objects[obj].name, objects[obj].surname, objects[obj].phone, objects[obj].address];
          break;
          case AppConstants.PRODUCTS: fields = [objects[obj].name, objects[obj].type, objects[obj].subType, objects[obj].price, objects[obj].gender, objects[obj].size, objects[obj].color, objects[obj].material, objects[obj].collection, '', ''];
          break;
        }

        this.labels = {...this.labels, [obj] : {
          title : objects[obj].title,
          fields :  fields
        }};
      });
      this.setData(AppConstants.USERS);
    });
  }

  setData(object: string){
    console.log('qui');
    switch (object) {
      case AppConstants.USERS: this.setUserData();
      break;

      case AppConstants.PRODUCTS: this.setProductData();
      break;
    }
  }

  setUserData(){
    this.getUserRegistry();
    this.title = this.labels[AppConstants.USERS].title;
    this.fields = this.labels[AppConstants.USERS].fields;

    document.querySelector('#dataTable')?.dispatchEvent(new CustomEvent('dataTable'));
  }

  setProductData(){
    this.getProducts();
    this.title = this.labels[AppConstants.PRODUCTS].title;
    this.fields = this.labels[AppConstants.PRODUCTS].fields;
    console.log(this.fields);

    document.querySelector('#dataTable')?.dispatchEvent(new CustomEvent('dataTable'));
  }

  deleteProduct(id: number | undefined){
    if(id){
      
    }
  }

}
