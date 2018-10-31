import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  getcategoryList(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'categorylist/')
  }

  getlocationapi() {
    return this.http.get(environment.apiEndpoint + 'locationlist/')
  }

  recentService() {
    return this.http.get(environment.apiEndpoint + 'recentserviceslist/')
  }

  getlocationName(data) {
    return this.http.get(environment.apiEndpoint + 'locationid/'+data)
  }

  getcategoryName(data) {
    return this.http.get(environment.apiEndpoint + 'categoryid/'+data)
  }

}
