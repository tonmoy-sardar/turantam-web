import { Injectable, EventEmitter, Output } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class ContactusService {

  constructor(
    private http: HttpClient
  ) { }



  sendMessage(data): Observable<any> {
    console.log(data);
    return this.http.post(environment.apiEndpoint + 'contactusmail/', data)
  }

  

}
