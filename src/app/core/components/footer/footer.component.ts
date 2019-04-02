import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
//services 
import { HomeService } from '../../services/home.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  cmsPageList:any=[];
  constructor(
    private homeService:HomeService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getCmsPages();
  }

  getCmsPages() {
    this.homeService.getCmsPageList().subscribe(
      res => {
        console.log(res);
         this.cmsPageList = res['result'];
        // console.log(this.cmsPageList);
      },
      error => {
        console.log(error);
      }
    );
  }
  gotoPage(slug) {
    this.router.navigateByUrl('/cms/' + slug);
  }

}
