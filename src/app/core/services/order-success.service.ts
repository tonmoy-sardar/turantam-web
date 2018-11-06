import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
@Injectable()
export class OrderSuccessService {

  constructor(
    private http: HttpClient
  ) { }
  getorderDetails(data): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'orderdetailsbyid/'+data)
  }
}
