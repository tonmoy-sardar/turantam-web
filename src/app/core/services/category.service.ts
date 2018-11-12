import { Injectable} from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getsubCat(data): Observable<any> {
    console.log(data);
    return this.http.get(environment.apiEndpoint+'serviceslistbycatid/'+data)
  }

  getsubCatbyLocation(id,cityid): Observable<any> {
     return this.http.get(environment.apiEndpoint+'subcategorylist/'+id+'/'+ cityid)
   }
 

}
