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
  visible_key:boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderSuccessService:OrderSuccessService
  ) { }

  ngOnInit() {
    this.visible_key=false;
    if (localStorage.getItem('isLoggedin')) {
      this.user_id = localStorage.getItem('userId');
      this.user_email = localStorage.getItem('userEmail');


    }

    this.getOrderDetails(this.route.snapshot.params['id']);
  }

  getOrderDetails(id) {
    this.orderSuccessService.getorderDetails(id).subscribe(
      res => {
        this.visible_key=true;
        this.orderDetails = res.result;
    
      },
      error => {
        this.visible_key=true;
        console.log(error);
      }
    );
  }
  goToHome() {
    this.router.navigateByUrl('/home');
  }

}
