import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-myprofile-sidebar',
  templateUrl: './myprofile-sidebar.component.html',
  styleUrls: ['./myprofile-sidebar.component.scss']
})
export class MyprofileSidebarComponent implements OnInit {
  loggedIn: boolean;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['/']);

  }
  

}
