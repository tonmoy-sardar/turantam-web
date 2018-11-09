import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class CheckoutService {

  constructor(
    private http: HttpClient
  ) { }

  getAddressList(data): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'cusaddlistbycusid/'+data)
  }


  addOrder(data): Observable<any> {
    console.log(data);
    return this.http.post(environment.apiEndpoint + 'addorder/', data)
  }

  paytmFormValue(order_no,order_amount,customer_email): Observable<any> {
    order_amount =1;
   // return this.http.get(environment.apiEndpoint + 'orderconfig/?price=' + order_amount + '&customer_email=' + customer_email + '&type=web')
   return this.http.get(environment.apiEndpoint + 'orderconfig/?order_no=' + order_no + '&price=' + order_amount + '&customer_email=' + customer_email + '&type=web')
  }

}
