import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  gender?: string | null;
  type?: string | null;
  subtype?: string | null;

  constructor(private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => { 
      console.log(params);
      this.gender = params.get('gender');  
      this.type = params.get('type');  
      this.subtype = params.get('subtype');

      if (this.subtype) {
        console.log(this.subtype, document.getElementsByName(this.subtype));
      }

    });
  }

  filter(){}

}
