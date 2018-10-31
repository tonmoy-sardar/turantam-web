import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '../../core/services/package.service';
@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  qty: any;
  packageList :any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private packageService: PackageService,
  ) { }

  ngOnInit() {
    this.getCartItems();
    this.getpackageList(this.route.snapshot.params['id']);

   
  }

  getpackageList(id) {
    this.packageService.getpackageList(id).subscribe(
      res => {
        this.packageList = res.result;
        console.log(this.packageList);
       
        if (sessionStorage.getItem('total')=='0' ) {
          sessionStorage.setItem('total','0');
           for ( let i=0; i< this.packageList.length; i++) {
            sessionStorage.setItem('qty'+this.packageList[i]['id'],'0');
            //sessionStorage.setItem('amount'+this.packageList[i]['id'],'0');
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  addCart(id) {
    this.qty = parseInt(sessionStorage.getItem('qty'+id))+1;
    sessionStorage.setItem('qty'+id,this.qty);
  }

  deleteCart(id) {
    if(parseInt(sessionStorage.getItem('qty'+id)) > 0) {
      this.qty = parseInt(sessionStorage.getItem('qty'+id))-1;
      sessionStorage.setItem('qty'+id,this.qty);
    }
    
  }

  

  getCartItems() {
    this.qty = 0;
  }

  gotoPackagedetails() {
    this.router.navigateByUrl('/package/details');
  }

}
