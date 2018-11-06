import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// services
import { OrderSuccessService } from '../../core/services/order-success.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {
  orderDetails:any;
  user_id:string;
  user_email:string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderSuccessService:OrderSuccessService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('isLoggedin')) {
      this.user_id = localStorage.getItem('userId');
      this.user_email = localStorage.getItem('userEmail');

    }

    this.getOrderDetails(this.route.snapshot.params['id']);
  }

  getOrderDetails(id) {
    this.orderSuccessService.getorderDetails(id).subscribe(
      res => {
        this.orderDetails = res.result;
    
      },
      error => {
        console.log(error);
      }
    );
  }

}
