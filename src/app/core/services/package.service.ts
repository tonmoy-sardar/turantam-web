import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class PackageService {

  constructor(
    private http: HttpClient
  ) { }

  getServiceList(data): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'serviceslistbysubcatid/'+data)
  }

  getpackageList(data): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'packageslistbyserviceid/'+data)
  }

  getpackageDetails(data): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'packagesdetails/'+data)
  }

  recentservice(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'recentcategorylist')
  }
}
