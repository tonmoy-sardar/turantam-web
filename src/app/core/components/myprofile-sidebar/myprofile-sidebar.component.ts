import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// services
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-myprofile-sidebar',
  templateUrl: './myprofile-sidebar.component.html',
  styleUrls: ['./myprofile-sidebar.component.scss']
})
export class MyprofileSidebarComponent implements OnInit {
  loggedIn: boolean;
  constructor(
    private router: Router,
    private loginService:LoginService
  ) { 
    
  }

  ngOnInit() {
  }

  logout() {
    this.loginService.logOutStatus(true);
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['/']);

  }



}
