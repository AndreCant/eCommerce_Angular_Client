import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppConstants } from 'src/app/app.constants';
import { Image } from 'src/app/model/Image';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';
import { getSize, getUserId } from 'src/app/utility/Utitity';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  @ViewChildren('sizeSelect') sizeSelect?: QueryList<ElementRef>;
  @ViewChildren('quantitySelect') quantitySelect?: QueryList<ElementRef>;

  product$?: Product;
  image$?: Image;
  availableSizes?: string[];

  // constructor(private activatedroute: ActivatedRoute, private service: ProductService, private toastr: ToastrService, private translate$: TranslateService) { }
  constructor(private activatedroute: ActivatedRoute, private service: ProductService, private toastr: ToastrService) { }

  get isWishlisted(){
    let wishlist = window.localStorage.getItem(AppConstants.WISHLIST);

    if (wishlist && this.product$) return JSON.parse(wishlist).products.includes(this.product$.id);
    return false;
  }

  get sizeSLabel(){
    return getSize('S', this.product$?.gender, this.product$?.type);
  }

  get sizeMLabel(){
    return getSize('M', this.product$?.gender, this.product$?.type);
  }

  get sizeLLabel(){
    return getSize('L', this.product$?.gender, this.product$?.type);
  }

  get sizeXLLabel(){
    return getSize('XL', this.product$?.gender, this.product$?.type);
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    
    this.activatedroute.paramMap.subscribe(params => {
      const productId = params.get('id');

      if (productId) this.service.getProduct(`${AppConstants.SERVICES_BASE_URL}/product/${productId}`).subscribe(product => {
        this.product$ = product;

        if (product.images) this.image$ = product.images.find(image => image.is_primary == true);
        if (product.size_available) this.availableSizes = product.size_available.split(',');
      });
    });
  }

  wishlist(){
    let wishlist = window.localStorage.getItem(AppConstants.WISHLIST);

    if (this.product$) {
      if (wishlist) {
        let products = JSON.parse(wishlist).products;
        let userId = JSON.parse(wishlist).userId;
  
        if (products.includes(this.product$.id)) {
          products.splice(products.indexOf(this.product$.id), 1)
        }else{
          products.push(this.product$.id);
        }

        window.localStorage.setItem(
          AppConstants.WISHLIST, 
          JSON.stringify({
            userId: userId,
            products: products
          })
        );
      }else{
        window.localStorage.setItem(
          AppConstants.WISHLIST,
          JSON.stringify({
            userId: getUserId(),
            products: [this.product$.id]
          })
        );
      }
    }
  }

  cart(){
    let cart = window.localStorage.getItem(AppConstants.CART);
    let size;
    let quantity;

    Object.values(this.sizeSelect?.first.nativeElement).forEach((elem: any) => {
        if(elem.selected) size = elem.value;
    });

    Object.values(this.quantitySelect?.first.nativeElement).forEach((elem: any) => {
      if(elem.selected) quantity = elem.value;
    });

    if (this.product$) {
      if (cart) {
        let products = JSON.parse(cart).products;
        let userId = JSON.parse(cart).userId;
  
        if (Object.keys(products).includes(String(this.product$.id))) {
          products[String(this.product$.id)].quantity =  Number(products[String(this.product$.id)].quantity) + Number(quantity);
        }else{
          products = {...products, [this.product$.id]: { size: size, quantity: quantity}  };
        }

        window.localStorage.setItem(
          AppConstants.CART, 
          JSON.stringify({
            userId: userId,
            products: products
          })
        );
      }else{
        window.localStorage.setItem(
          AppConstants.CART,
          JSON.stringify({
            userId: getUserId(),
            products: { [this.product$.id]: { size: size, quantity: quantity} }
          })
        );
      }
    }

    this.toastr.success('Product added to cart.', 'Success!');
  }
}
