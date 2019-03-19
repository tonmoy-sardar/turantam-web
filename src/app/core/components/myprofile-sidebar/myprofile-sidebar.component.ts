import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

// services
import { LoginService } from '../../../core/services/login.service';
import { MyprofileService } from '../../../core/services/myprofile.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-myprofile-sidebar',
  templateUrl: './myprofile-sidebar.component.html',
  styleUrls: ['./myprofile-sidebar.component.scss']
})
export class MyprofileSidebarComponent implements OnInit {
  loggedIn: boolean;
  profileDetails :any ={};
  user_id:string;
  imageBaseUrl:string;
  constructor(
    private router: Router,
    private loginService:LoginService,
    private myprofileService:MyprofileService,

  ) { 
    myprofileService.getProfileUpdateStatus.subscribe(status => this.profileUpdateStatus(status));
  }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.user_id = localStorage.getItem('userId');
    this.getProfileDetails(this.user_id);
  }

  getProfileDetails(id) {
    this.myprofileService.getProfile(id).subscribe(
      res => {
        this.profileDetails = res['result'];
        //console.log(this.profileDetails);
      },
      error => {
        console.log(error);
      }
    );
  }

  logout() {
    this.loginService.logOutStatus(true);
    localStorage.clear();
    sessionStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['/']);

  }

  private profileUpdateStatus(status: boolean) {
    if (status) {
      this.getProfileDetails(this.user_id);
    }
  }



}
