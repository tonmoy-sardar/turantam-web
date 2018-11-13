import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PackageService } from '../../core/services/package.service';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

// core 
import { AddAddressComponent } from '../../core/components/add-address/add-address.component'

// services
import { CheckoutService } from '../../core/services/checkout.service';
import { AddAddressService } from '../../core/services/add-address.service';
import { CartService } from '../../core/services/cart.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  customer_cart_data:any;
  imageBaseUrl: string;
  user_id:any;
  all_cart_data:any;
  total_item_price: number;
  total_packing_price: number;
  total_price: number;
  addressList=[];
  payment_type:any;
  deliveryAddress:any;
  user_email:any;
  order_data:any;
  order_details:any;
  orderStatus:any;
  paymentdetails_data: any;
  paymentFormActive: boolean;
  paytmEnable:any;
  

  
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private packageService: PackageService,
    public dialog: MatDialog,
    private checkoutService:CheckoutService,
    private addAddressService:AddAddressService,
    private cartService:CartService,
    private toastr: ToastrService,
  ) { 
    addAddressService.getAddressStatus.subscribe(status => this.getAddressStatus(status));
   
  }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.paytmEnable = environment.paytmEnable;
    if (localStorage.getItem('isLoggedin')) {
      this.user_id = localStorage.getItem('userId');
      this.user_email = localStorage.getItem('userEmail');
      console.log(this.user_id);

    }
    this.populateData();
    this.getAddress(this.user_id);
    this.payment_type =2;
  }

  populateData() {
    if (sessionStorage.getItem("cart")) {
      this.all_cart_data = JSON.parse(sessionStorage.getItem("cart"));
      console.log(this.all_cart_data);
      var filteredData = this.all_cart_data.filter(x => x.customer_id == this.user_id)
      this.customer_cart_data = filteredData;
      console.log(this.customer_cart_data)
      this.getTotalItemPrice();
      this.getTotalPackingPrice();
    }
    else {
      this.customer_cart_data = [];
    }
  }

  getTotalItemPrice() {
    this.total_item_price = 0;
    this.all_cart_data.forEach(x => {
      if (x.discounted_price > 0) {
        this.total_item_price += (x.discounted_price * x.quantity);
      }
      else {
        this.total_item_price += (x.price * x.quantity);
      }
    })
  }

  getTotalPackingPrice() {
    this.total_packing_price = 0;
    this.customer_cart_data.forEach(x => {
      this.total_packing_price += x.packing_charges;
    })
  }

  getAddress(id) {
      this.checkoutService.getAddressList(id).subscribe(
        res => {
          this.addressList = res.result;
          console.log(this.addressList);

          this.deliveryAddress =  this.addressList[0].id;
          console.log(this.deliveryAddress);

        },
        error => {
          console.log(error);
        }
      );

  }


  addAddress() {
    let dialogRef = this.dialog.open(AddAddressComponent, {
      width: '525px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
    })

  }

  getAddressStatus(status: boolean) {
    if(status) {
      this.getAddress(this.user_id);
    }
  }


  addressChange(address) {
    this.deliveryAddress = address.id;
  }

  placeOrder(payment_type) {

    if(this.deliveryAddress) {
      this.order_data ={};
      this.order_data.payment_type = payment_type;
      this.order_data.address_id = this.deliveryAddress;
      this.order_data.customer_id = this.user_id;
      this.order_data.customer_email = this.user_email;
      this.order_data.order_total_price = this.total_item_price;
      console.log(this.order_data);
      this.order_details =[];
    this.customer_cart_data.forEach(item => {
     this.order_details.push(
       {
         'package_id':item.package_id,
         'quantity':item.quantity,
         'unit_price':item.price,
         'IGST':'',
         'CGST':'',
         'GST':''
       }
     );
      });
      this.order_data.order_details = this.order_details;
      console.log(this.order_data);

        this.checkoutService.addOrder(this.order_data).subscribe(
          res => {
           this.orderStatus = res.result;
           if(payment_type ==1) {
            this.getPaymentSettingsDetails();
           }
           else {
            sessionStorage.clear();
            this.cartService.cartNumberStatus(true);
            this.router.navigateByUrl('/ordersuccess/'+this.orderStatus.id);
           }
           
          },
          error => {
            console.log(error);
          }
        );
    
    }
    else {
      this.toastr.error('Please Select a Delivery Address', '', {
        timeOut: 6000,
      });
    }
   

  }


  getPaymentSettingsDetails() {
    // console.log(this.orderStatus);
    // console.log(this.total_item_price);
    // console.log(this.user_email);

      this.checkoutService.paytmFormValue(this.orderStatus.order_no,this.total_item_price,this.user_email).subscribe(
        (
          data => {
            console.log(data);
            this.paymentdetails_data = data.result;
            this.paymentFormActive = true;
            console.log(this.paymentdetails_data);
            console.log(this.order_data);
            let btn: HTMLElement = document.getElementById('payment_btn') as HTMLElement;
            setTimeout(function () {
              btn.click();
            }, 100);
            
          }
        ),
      );

   
  }

}
