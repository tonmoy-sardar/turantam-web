import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// services
import { MyordersService } from '../../core/services/myorders.service';
@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {
  user_id :string;
  myOrderList:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private myordersService:MyordersService
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

}
