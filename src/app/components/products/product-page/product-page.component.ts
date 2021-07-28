import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/app.constants';
import { Image } from 'src/app/model/Image';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';

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

}
