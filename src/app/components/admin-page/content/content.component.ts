import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShowAllAction as ShowAllOrders } from 'src/app/actions/order.actions';
import { ShowAllAction as ShowAllCategories, UpdateAction } from 'src/app/actions/category.actions';
import { DeleteAction, EProductActions, ShowAllAction } from 'src/app/actions/product.actions';
import { ShowUsersAction } from 'src/app/actions/userRegistry.actions';
import { AppConstants } from 'src/app/app.constants';
import { Category } from 'src/app/model/Category';
import { Order } from 'src/app/model/Order';
import { Product } from 'src/app/model/Product';
import { UserRegistry } from 'src/app/model/UserRegistry';
import { selectorCategory } from 'src/app/selectors/category.selector';
import { selectorOrder } from 'src/app/selectors/order.selector';
import { selectorProduct } from 'src/app/selectors/product.selector';
import { selectorUserRegistry } from 'src/app/selectors/userRegistry.selector';
import { IAppState } from 'src/app/state/app.states';
import { getSize } from 'src/app/utility/Utitity';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnChanges {

  @Input()
  currentTab?: string;

  @ViewChildren('subCategoriesInputs') 
  subCategoriesInputs?: QueryList<ElementRef>;

  @ViewChildren('typeDiv') 
  typeDivs?: QueryList<ElementRef>;

  @ViewChildren('typeLabel') 
  typeLabels?: QueryList<ElementRef>;

  @ViewChildren('typeInput') 
  typeInputs?: QueryList<ElementRef>;

  fields: string[] = [];
  userRegistries$?: Observable<UserRegistry[]>;
  products$?: Observable<Product[]>;
  orders$?: Observable<Order[]>;
  categories$?: Observable<Category[]>;
  title?: string;
  labels?: any = {};
  button?: string;
  destroyed$ = new Subject<boolean>();
  openForm: boolean = false;
  productToUpdate?: Product;

  get buttonForm(){
    return this.currentTab === 'products' && !this.openForm;
  }  

  get buttonLabel(){
    return window.localStorage.getItem(AppConstants.LANG_STORAGE) == 'en' ? this.title?.slice(0, -1) : this.title;
  }

  constructor(private translate$: TranslateService, private store: Store<IAppState>, updates$: Actions, private toastr: ToastrService) {
    this.userRegistries$ = this.store.pipe(select(selectorUserRegistry));
    this.products$ = this.store.pipe(select(selectorProduct));
    this.orders$ = this.store.pipe(select(selectorOrder));
    this.categories$ = this.store.pipe(select(selectorCategory));
    this.setLabels();

    updates$.pipe(
      ofType(EProductActions.DELETE_SUCCESS),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.translate$.get("table.products.messages.delete").subscribe(labels => {
        this.toastr.success(labels.detail, labels.title);
      });
      this.getProducts();
    });
  }
  
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.openForm = false;
    this.setData(changes.currentTab.currentValue);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  getUserRegistry(){
    this.store.dispatch(new ShowUsersAction);
  }

  getProducts(){
    this.store.dispatch(new ShowAllAction(`${AppConstants.SERVICES_BASE_URL}/products`));
  }

  getOrders(){
    this.store.dispatch(new ShowAllOrders('admin'));
  }

  getCategories(){
    this.store.dispatch(new ShowAllCategories());
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
          case AppConstants.ORDERS: fields = [objects[obj].code, objects[obj].status, objects[obj].items, ''];
          break;
          case AppConstants.CATEGORIES: fields = [objects[obj].type, objects[obj].subTypes];
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
    switch (object) {
      case AppConstants.USERS: this.setUserData();
      break;

      case AppConstants.PRODUCTS: this.setProductData();
      break;

      case AppConstants.ORDERS: this.setOrderData();
      break;

      case AppConstants.CATEGORIES: this.setCategoryData();
      break;
    }
  }

  setUserData(){
    this.getUserRegistry();
    this.title = this.labels[AppConstants.USERS].title;
    this.fields = this.labels[AppConstants.USERS].fields;

    // document.querySelector('#dataTable')?.dispatchEvent(new CustomEvent('dataTable'));
  }

  setProductData(){
    this.getProducts();
    this.title = this.labels[AppConstants.PRODUCTS].title;
    this.fields = this.labels[AppConstants.PRODUCTS].fields;

    // document.querySelector('#dataTable')?.dispatchEvent(new CustomEvent('dataTable'));
  }

  setOrderData(){
    this.getOrders();
    this.title = this.labels[AppConstants.ORDERS].title;
    this.fields = this.labels[AppConstants.ORDERS].fields;
  }

  setCategoryData(){
    this.getCategories();
    this.title = this.labels[AppConstants.CATEGORIES].title;
    this.fields = this.labels[AppConstants.CATEGORIES].fields;
  }

  deleteProduct(id: number | undefined){
    if(id){
      this.store.dispatch(new DeleteAction(id));
    }
  }

  addProduct(){
    this.openForm = true;
  }

  productEventHandler(event: boolean){
    if(event){
      this.openForm = false;
      this.productToUpdate = undefined;
      this.getProducts();
    }
  }

  updateProduct(product: Product){
    this.productToUpdate = product;
    this.openForm = true;
  }

  getSizes(sizes: any, gender: any, type: any){
    return sizes.split(',').reduce((a: any, b: any) => {
      return `${a},${getSize(b, gender, type)}`;
    }, '').substring(1);
  }

  deleteSubCategory(cat: Category, subCategory: string){
    const subTypes = cat.sub_types?.split(';').filter(elem => {
      return elem != subCategory;
    })?.join(';');
    
    const category: Category = {
      id: cat.id,
      type_name: cat.type_name,
      sub_types: subTypes
    }

    if(category.id) {
      this.store.dispatch(new UpdateAction(category, category.id));
      this.getCategories();
    }
  }

  addSubCategory(cat: Category){
    let newSubCategory;

    this.subCategoriesInputs?.forEach(elem => {
      if(elem.nativeElement.id == cat.id) newSubCategory = elem.nativeElement.value; 
    });

    if (newSubCategory) {
      const category: Category = {
        id: cat.id,
        type_name: cat.type_name,
        sub_types: cat.sub_types ? `${cat.sub_types};${newSubCategory}` : newSubCategory
      }

      if(category.id) {
        this.store.dispatch(new UpdateAction(category, category.id));
        this.getCategories();
      }
    }
  }

  showInput(id: any){
    this.typeDivs?.forEach(elem => {
      if(elem.nativeElement.id == id) elem.nativeElement.hidden = false; 
    });

    this.typeLabels?.forEach(elem => {
      if(elem.nativeElement.id == id) elem.nativeElement.hidden = true; 
    });
  }

  showLabel(id: any){
    this.typeDivs?.forEach(elem => {
      if(elem.nativeElement.id == id) elem.nativeElement.hidden = true; 
    });

    this.typeLabels?.forEach(elem => {
      if(elem.nativeElement.id == id) elem.nativeElement.hidden = false; 
    });
  }

  updateCategoryName(cat: Category){
    let newCategoryName;

    this.typeInputs?.forEach(elem => {
      if(elem.nativeElement.id == cat.id) newCategoryName = elem.nativeElement.value;
    });
    
    if (newCategoryName) {
      const category: Category = {
        id: cat.id,
        type_name: newCategoryName,
        sub_types: cat.sub_types
      }

      if(category.id) {
        this.store.dispatch(new UpdateAction(category, category.id));
        this.getCategories();
      }
    }
  }

}
