import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '../../../core/services/package.service';
import { environment } from '../../../../environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// core 
import { LoginComponent } from '../../../core/components/login/login.component'


// services
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-packagedetails',
  templateUrl: './packagedetails.component.html',
  styleUrls: ['./packagedetails.component.scss']
})
export class PackagedetailsComponent implements OnInit {
  total: any;
  recentserviceList = [];
  imageBaseUrl: string;
  packagedetails:any;
  packageEntity = [];
  cartProducts = [];
  cartqty:any;
  logeduserId:any;
  customer_cart_data: any;
  user_id:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private packageService: PackageService,
    public dialog: MatDialog,
    private cartService:CartService
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;

    this.cartqty = 1;

    if (localStorage.getItem('isLoggedin')) {
      this.user_id = localStorage.getItem('userId');

    }
    
    this.packageDetails(this.route.snapshot.params['id']);

    if (localStorage.getItem('isLoggedin')) {
      this.logeduserId = localStorage.getItem('userId');
      
    }
    if (sessionStorage.getItem("cart")) {
      this.customer_cart_data = JSON.parse(sessionStorage.getItem("cart"));
    }
    else {
      this.customer_cart_data = [];
    }

  }

  packageDetails(id) {
    this.packageService.getpackageDetails(id).subscribe(
      res => {
        this.packagedetails = res['result'];
        console.log(this.packagedetails);
        console.log(this.packagedetails.iscart);
        this.packageEntity = res['result'].package_entity;
        var index = this.customer_cart_data.findIndex(y => y.package_id == this.packagedetails.id && y.customer_id == this.user_id);

          if (index != -1) {
            this.packagedetails.isCart = true;
              this.packagedetails.quantity = this.customer_cart_data[index].quantity;
          }
          else {
            this.packagedetails.isCart = false;
            this.packagedetails.quantity = 0;
          }
      },
      error => {
        console.log(error);
      }
    );
  }

  
  addtoCart(item) {
    console.log(item);
    if (localStorage.getItem('isLoggedin')) {
    var data = {
      customer_id: this.user_id,
      package_id: item.id,
      package_name: item.name,
      description: item.description,
      price: item.price,
      discounted_price: item.discounted_price,
      image_small: item.image_small,
      quantity: item.quantity + 1
    }
    var index = this.customer_cart_data.findIndex(y => y.package_id == item.id && y.customer_id == this.user_id);

      if (this.packagedetails.id == item.id) {
        this.packagedetails.isCart = true;
        this.packagedetails.quantity = item.quantity + 1

      }

    if (index == -1) {
      this.customer_cart_data.push(data);
      this.setCartData();
    }
  }
  else {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '525px',
      data: {type:1}
    });
    dialogRef.afterClosed().subscribe(result => {
 
    })
  }

  this.cartService.cartNumberStatus(true);
  }

  
  decrement(item) {
    if (item.quantity > 1) {
      var index = this.customer_cart_data.findIndex(y => y.package_id == item.id && y.customer_id == this.user_id);
      if (index != -1) {
        this.customer_cart_data[index].quantity = item.quantity - 1;
        this.setCartData();
      }

        if (this.packagedetails.id == item.id) {
          this.packagedetails.quantity = item.quantity - 1;

        }

    }
    else {
      var index = this.customer_cart_data.findIndex(y => y.package_id == item.id && y.customer_id == this.user_id);
      if (index != -1) {
        this.customer_cart_data.splice(index, 1);
        this.setCartData();
      }
      if (this.packagedetails.id == item.id) {
        this.packagedetails.isCart = false;
        this.packagedetails.quantity = item.quantity - 1;

      }

    }

  }
  increment(item) {
    var index = this.customer_cart_data.findIndex(y => y.package_id == item.id && y.customer_id == this.user_id);
    if (index != -1) {
      this.customer_cart_data[index].quantity = item.quantity + 1;
     this.setCartData();
    }
      if (this.packagedetails.id == item.id) {
        this.packagedetails.isCart = true;
        this.packagedetails.quantity = item.quantity + 1

      }

  }

  setCartData() {

    sessionStorage.setItem("cart", JSON.stringify(this.customer_cart_data));
  }




}
