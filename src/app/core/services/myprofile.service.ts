import { Injectable, EventEmitter, Output } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class MyprofileService {
  @Output() getProfileUpdateStatus: EventEmitter<any> = new EventEmitter();
  constructor(
    private http: HttpClient
  ) { }

  getProfile(data): Observable<any> {
    return this.http.get(environment.apiEndpoint+'userprofile/'+data)
  }

  updatemyProfile(id,profileImage,data): Observable<any> {
    
   // return this.http.post(environment.apiEndpoint + 'userprofileupdate/'+id, data)
    const formData: FormData = new FormData();
    if (data) {
      for (let key in data) {
          formData.append(key, data[key])
      }
      if(profileImage) { 
        formData.append('profile_image', profileImage, profileImage.name);
      }
      
      console.log(formData);
    }
    return this.http.post(environment.apiEndpoint + 'userprofileupdate/'+id, formData)
  }


  updateProfileStatus(data): Observable<any> {
    if (data = true) {
      this.getProfileUpdateStatus.emit(true);
      return
    }
  }
}
