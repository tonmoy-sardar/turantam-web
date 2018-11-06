import { Injectable, EventEmitter, Output } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';


@Injectable()
export class AddAddressService {
  @Output() getAddressStatus: EventEmitter<any> = new EventEmitter();
  constructor(
    private http: HttpClient
  ) { }

  getStateActiveList(): Observable<any> {
    return this.http.get(environment.apiEndpoint+'statelist/')
  }

  addcustomerAddress(data): Observable<any> {
    return this.http.post(environment.apiEndpoint+'addcustomeraddress/',data)
  }

  addressStatus(data): Observable<any> {
    if (data = true) {
      this.getAddressStatus.emit(true);
      return
    }
  }

}
