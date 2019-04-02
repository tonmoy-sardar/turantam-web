import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PackageService } from '../../core/services/package.service';
import { environment } from '../../../environments/environment';

// core 
import { LoginComponent } from '../../core/components/login/login.component'

// services
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  qty: any;
  packageList: any=[];
  serviceList:any;
  subCatName:any;
  user_id: any;
  customer_cart_data: any;
  imageBaseUrl: string;
  serviceId:any;
  subCatId:any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private packageService: PackageService,
    public dialog: MatDialog,
    private cartService:CartService
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.getCartItems();
    
    if (localStorage.getItem('isLoggedin')) {
      this.user_id = localStorage.getItem('userId');
    }
    else {
      this.user_id = "";
    }
   

    if (sessionStorage.getItem("cart")) {
      this.customer_cart_data = JSON.parse(sessionStorage.getItem("cart"));
    }
    else {
      this.customer_cart_data = [];
    }

    this.serviceId = this.route.snapshot.params['serviceid'];
    this.subCatId = this.route.snapshot.params['subcatid'];
  

    this.getAllServiceList(this.route.snapshot.params['subcatid']);
    this.getpackageList(this.route.snapshot.params['serviceid']);
  

  }
  

  getAllServiceList(subcatId) {
    this.packageService.getServiceList(subcatId).subscribe(
      res => {
       // console.log("Service List ==>",res);
        this.subCatName = res.subcategory_name;
        this.serviceList = res.result;
       // console.log(this.serviceList);

      },
      error => {
        console.log(error);
      }
    );
  }



  getpackageList(id) {
    this.packageService.getpackageList(id).subscribe(
      res => {
        //console.log("Package List ==>",res);
        this.packageList = res.result;
       
        for (let i = 0; i < this.packageList.length; i++) {
          var index = this.customer_cart_data.findIndex(y => y.package_id == this.packageList[i]['id'] && y.customer_id == this.user_id);

          if (index != -1) {
            this.packageList[i].isCart = true;
              this.packageList[i].quantity = this.customer_cart_data[index].quantity
          }
          else {
            this.packageList[i].isCart = false;
              this.packageList[i].quantity = 0;
          }
          
          
        }

      },
      error => {
        console.log(error);
      }
    );
  }

  // Cart code start
  addtoCart(item) {

   // if (localStorage.getItem('isLoggedin')) {
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
      console.log(data);
      //var index = this.customer_cart_data.findIndex(y => y.package_id == item.id && y.customer_id == this.user_id);
      var index = this.customer_cart_data.findIndex(y => y.package_id == item.id);
      for (let i = 0; i < this.packageList.length; i++) {
        if (this.packageList[i]['id'] == item.id) {
          this.packageList[i].isCart = true;
          this.packageList[i].quantity = item.quantity + 1
  
        }
      }
  
      if (index == -1) {
        this.customer_cart_data.push(data);
        this.setCartData();
      }
  //  }
    // else {
    //   let dialogRef = this.dialog.open(LoginComponent, {
    //     width: '525px',
    //     data: {type:1}
    //   });
    //   dialogRef.afterClosed().subscribe(result => {
    //   })
    // }
    
    this.cartService.cartNumberStatus(true);
  }

  setCartData() {

    sessionStorage.setItem("cart", JSON.stringify(this.customer_cart_data));
  }


  decrement(item) {
    if (item.quantity > 1) {
      var index = this.customer_cart_data.findIndex(y => y.package_id == item.id && y.customer_id == this.user_id);
      if (index != -1) {
        this.customer_cart_data[index].quantity = item.quantity - 1;
        this.setCartData();
      }

      for (let i = 0; i < this.packageList.length; i++) {
        if (this.packageList[i]['id'] == item.id) {
          this.packageList[i].quantity = item.quantity - 1;

        }
      }

    }
    else {
      var index = this.customer_cart_data.findIndex(y => y.package_id == item.id && y.customer_id == this.user_id);
      if (index != -1) {
        this.customer_cart_data.splice(index, 1);
        this.setCartData();
      }
      for (let i = 0; i < this.packageList.length; i++) {
        if (this.packageList[i]['id'] == item.id) {
          this.packageList[i].isCart = false;
          this.packageList[i].quantity = item.quantity - 1;

        }
      }



    }

  }
  increment(item) {
    var index = this.customer_cart_data.findIndex(y => y.package_id == item.id && y.customer_id == this.user_id);
    if (index != -1) {
      this.customer_cart_data[index].quantity = item.quantity + 1;
      this.setCartData();
    }
    for (let i = 0; i < this.packageList.length; i++) {
      if (this.packageList[i]['id'] == item.id) {
        this.packageList[i].isCart = true;
        this.packageList[i].quantity = item.quantity + 1

      }
    }

  }



  // Cart code end 



  getCartItems() {
    this.qty = 0;
  }

  gotoPackageListing(serviceid,subcatid) {
    this.router.navigateByUrl('/package/' + serviceid + '/' + subcatid);
    this.getpackageList(serviceid);
  }

  gotoPackagedetails() {
    this.router.navigateByUrl('/package/details');
    
 
  }


}
