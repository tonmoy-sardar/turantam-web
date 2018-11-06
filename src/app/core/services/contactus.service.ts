import { Injectable, EventEmitter, Output } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class ContactusService {

  constructor() { }

  sendMessageStatus(data): Observable<any> {
    if (data = true) {
      return
    }
  }

}
