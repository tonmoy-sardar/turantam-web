import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '../../../core/services/package.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-packagedetails',
  templateUrl: './packagedetails.component.html',
  styleUrls: ['./packagedetails.component.scss']
})
export class PackagedetailsComponent implements OnInit {
  total: any;
  recentserviceList = [];
  imageBaseUrl: string;
  packagedetails: any;
  packageEntity = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private packageService: PackageService,
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.total = 0;
    this.packageDetails(this.route.snapshot.params['id']);
    this.recentService();
  }

  packageDetails(id) {
    this.packageService.getpackageDetails(id).subscribe(
      res => {
        this.packagedetails = res['result'];
        console.log(this.packagedetails);
        this.packageEntity = res['result'].package_entity;
        console.log(this.packageEntity);
      },
      error => {
        console.log(error);
      }
    );
  }

  recentService() {
    this.packageService.recentservice().subscribe(
      res => {
        this.recentserviceList = res['result'];
      },
      error => {
        console.log(error);
      }
    );
  }

  cartDecrease() {
    
    if (this.total > 0) {
      this.total = this.total - 1;
    }

  }
  cartIncrease() {
   
    this.total = this.total + 1;
  }

}
