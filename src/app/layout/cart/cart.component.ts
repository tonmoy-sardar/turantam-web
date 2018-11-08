import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// core 
import { LoginComponent } from '../../core/components/login/login.component'

// services
import { CartService } from '../../core/services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  customer_cart_data:any;
  imageBaseUrl: string;
  user_id:any;
  all_cart_data:any;
  total_item_price: number;
  total_packing_price: number;
  total_price: number;
  constructor(
    private cartService:CartService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    if (localStorage.getItem('isLoggedin')) {
      this.user_id = localStorage.getItem('userId');
    }
    else {
      this.user_id ="";
    }
    this.populateData();
  }

  populateData() {
    if (sessionStorage.getItem("cart")) {
      this.all_cart_data = JSON.parse(sessionStorage.getItem("cart"));
      console.log(this.all_cart_data);
     // var filteredData = this.all_cart_data.filter(x => x.customer_id == this.user_id)
     // this.customer_cart_data = filteredData;

     this.customer_cart_data = this.all_cart_data;
     
      this.getTotalItemPrice();
      this.getTotalPackingPrice();
    }
    else {
      this.customer_cart_data = [];
    }
  }

  increment(i) {
    var qty = this.customer_cart_data[i].quantity;
     this.customer_cart_data[i].quantity = qty + 1;
    //var index = this.all_cart_data.findIndex(x => x.customer_id == this.user_id && x.package_id == this.customer_cart_data[i].package_id);
    var index = this.all_cart_data.findIndex(x => x.package_id == this.customer_cart_data[i].package_id);
    if (index != -1) {
      this.all_cart_data[index].quantity = qty + 1;
      this.setCartData()
    }

   // this.cartService.cartNumberStatus(true);
  }

  decrement(i) {
    var qty = this.customer_cart_data[i].quantity;
    if (qty > 1) {
      this.customer_cart_data[i].quantity = qty - 1;
      //var index = this.all_cart_data.findIndex(x => x.customer_id == this.user_id &&  x.package_id == this.customer_cart_data[i].package_id);
      var index = this.all_cart_data.findIndex(x => x.package_id == this.customer_cart_data[i].package_id);
      if (index != -1) {
        this.all_cart_data[index].quantity = qty - 1;
        this.setCartData()
      }
    }
    else {
      this.remove(this.customer_cart_data[i].package_id)
    }
  }




  setCartData() {
    console.log(this.all_cart_data);
    sessionStorage.setItem("cart", JSON.stringify(this.all_cart_data));
    this.getTotalItemPrice();
    this.getTotalPackingPrice();
  }

  remove(id) {
   // var index = this.all_cart_data.findIndex(x => x.customer_id == this.user_id && x.package_id == id);
   var index = this.all_cart_data.findIndex(x =>  x.package_id == id); 
   if (index != -1) {
      this.all_cart_data.splice(index, 1);
      this.customer_cart_data.splice(index, 1);
      this.setCartData()
    }
    this.cartService.cartNumberStatus(true);
  }


  getTotalItemPrice() {
    this.total_item_price = 0;
    this.customer_cart_data.forEach(x => {
      if (x.discounted_price > 0) {
        this.total_item_price += (x.discounted_price * x.quantity);
        console.log(this.total_item_price);
      }
      else {
        this.total_item_price += (x.price * x.quantity);
        console.log(this.total_item_price);
      }
    })
  }

  getTotalPackingPrice() {
    this.total_packing_price = 0;
    this.customer_cart_data.forEach(x => {
      this.total_packing_price += x.packing_charges;
    })
  }

  gotoCheckoutpage() {
    //this.router.navigateByUrl('/checkout');
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigateByUrl('/checkout');
    }
    else {
      let dialogRef = this.dialog.open(LoginComponent, {
        width: '525px',
        data: { type: 1 }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.router.navigate(['/checkout']);
      })
    }
  }

 


}
