import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// services
import { MyordersService } from '../../core/services/myorders.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {
  user_id :string;
  myOrderList =[];
  starList: boolean[] = [true,true,true,true,true];       // create a list which contains 
  rating:number;
  order:any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private myordersService:MyordersService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('isLoggedin')) {
      this.user_id = localStorage.getItem('userId');
    }
    this.orderList(this.user_id);
  }
  orderList(id) {
    this.myordersService.getOrderList(id).subscribe(
      res => {
       this.myOrderList = res.result;
       console.log(this.myOrderList);
    
      },
      error => {
        console.log(error);
      }
    );
  }

  // addRating(i) {
  //   alert(i);
  //   console.log(i);
  // }
  setStar(data: any, packageid, orderid, user_id) {
    this.rating = data + 1;
    for (var i = 0; i <= 4; i++) {
      if (i <= data) {
        this.starList[i] = false;
      }
      else {
        this.starList[i] = true;
      }
    }
   
    this.order = {
    rating : this.rating,
    package_id : packageid,
    order_id : orderid,
    user_id : user_id
    }
   console.log(this.order);
    this.myordersService.addRating(this.order).subscribe(
      res => {
     //  this.myOrderList = res.result;
       console.log(res);
       this.toastr.success('Your Rating succesfully Submitted', '', {
        timeOut: 6000,
      });
    
      },
      error => {
        console.log(error);
      }
    );
  }  
}
