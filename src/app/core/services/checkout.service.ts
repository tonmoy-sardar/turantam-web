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

}
