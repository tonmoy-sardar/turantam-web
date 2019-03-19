import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HomeService } from '../../core/services/home.service';
@Component({
  selector: 'app-allcategory',
  templateUrl: './allcategory.component.html',
  styleUrls: ['./allcategory.component.scss']
})
export class AllcategoryComponent implements OnInit {
  categoryList =[];
  imageBaseUrl:string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.getCategoryList();
  }

  getCategoryList() {
    this.homeService.getcategoryList().subscribe(
      res => {
        this.categoryList = res.result;
        //console.log(this.categoryList);
      },
      error => {
        console.log(error);
      }
    );
  }

}
