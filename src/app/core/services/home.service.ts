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
  testimonialService() {
    return this.http.get(environment.apiEndpoint + 'testimoniallist/')
  }

  getlocationName(data) {
    return this.http.get(environment.apiEndpoint + 'locationid/'+data)
  }

  getcategoryName(data) {
    return this.http.get(environment.apiEndpoint + 'categoryid/'+data)
  }

  getCatList(data) {
    return this.http.get(environment.apiEndpoint + 'categorylistbyname?cat_name='+data)
  }
  getCms(slug){
    return this.http.get(environment.apiEndpoint + 'pagedetailsbyslug/'+slug)
  }
  getCmsPageList(){
    return this.http.get(environment.apiEndpoint + 'pages/')
  }
}
