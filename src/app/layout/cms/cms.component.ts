import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../core/services/home.service';
@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit {
  cmsSlug:string;
  cmsDetails:any={};
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private homeService: HomeService
  ) { }

  ngOnInit() {
   // this.cmsSlug = this.route.snapshot.params['slug'];
    this.getCmsDetails(this.route.snapshot.params['slug']);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  getCmsDetails(slug) {
    this.homeService.getCms(slug).subscribe(
      res => {
       this.cmsDetails = res['result'];
       // console.log(this.cmsDetails);
      },
      error => {
        console.log(error);
      }
    );
  }

}
