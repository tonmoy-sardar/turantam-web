import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class categoryComponent implements OnInit {
  subcatList = [];
  catid: any;
  cityid: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.catid = this.route.snapshot.params['id'];
    this.cityid = this.route.snapshot.params['cityid'];

    if (this.cityid != undefined) {
      this.getSubcategorybyLocation(this.catid, this.cityid);
    }
    else {
      this.getSubcategory(this.catid);
    }

  }

  getSubcategory(id) {
    this.categoryService.getsubCat(id).subscribe(
      res => {
        this.subcatList = res.result;
      },
      error => {
        console.log(error);
      }
    );
  }

  getSubcategorybyLocation(id, cityid) {
    this.categoryService.getsubCatbyLocation(id, cityid).subscribe(
      res => {
        this.subcatList = res.result;
      },
      error => {
        console.log(error);
      }
    );
  }

  gotoPackagepage() {
    this.router.navigateByUrl('/package');
  }


}
