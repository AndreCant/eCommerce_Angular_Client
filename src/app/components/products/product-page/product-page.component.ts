import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/app.constants';
import { Image } from 'src/app/model/Image';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';
import { getUserId } from 'src/app/utility/Utitity';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  product$?: Product;
  image$?: Image;
  availableSizes?: string[];

  constructor(private activatedroute: ActivatedRoute, private service: ProductService) { }

  get isWishlisted(){
    let wishlist = window.localStorage.getItem(AppConstants.WISHLIST);

    if (wishlist && this.product$) return JSON.parse(wishlist).products.includes(this.product$.id);
    return false;
  }

  ngOnInit(): void {
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
}
