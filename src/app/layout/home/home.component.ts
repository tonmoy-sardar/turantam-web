import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { OwlCarousel } from 'ngx-owl-carousel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MapsAPILoader } from '@agm/core';
import { ToastrService } from 'ngx-toastr';

import { GooglemapsService } from '../../core/services/googlemaps.service';
import { HomeService } from '../../core/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('owlElement') owlElement: OwlCarousel
  location: any;
  lat: any;
  long: any;
  city: any;
  categoryList = [];
  locationList = [];
  recentServices: any;
  imageBaseUrl: string;
  locationid: any;
  catid: any;
  catname:string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private googlemapsService: GooglemapsService,
    private homeService: HomeService
  ) {
    this.catname ="";
   }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
    this.getLocation();
    this.getCategoryList();
    this.getLocationApi();
    this.recentService();

  }

  // gotoLocation(event: any) {
  //   this.location = event.target.value;
  //   localStorage.setItem('location', this.location);
  //   this.router.navigateByUrl('/home/' + this.location);

  // }

  gotoLocation(id) {
    this.locationid = id;
  }

  gotosearch(cityid, catname) {
    this.homeService.getcategoryName(catname).subscribe(
      res => {
        if (res['result'] != null) {
          this.catid = res['result']['id'];
          this.router.navigateByUrl('/category/' + this.catid + '/' + cityid);
        }
        else {
         // alert("Wrong Category");
         this.toastr.error('Wrong Category', '', {
          timeOut: 3000,
        });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getLocation() {

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(this.showPosition,this.showError);
    // } else {
      
    // }
    
    if (navigator.geolocation) {
      
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        this.getAddress();
      });
    }
   
  }

  // showPosition(position) {
  //  // if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(position => {
  //      // this.location = position.coords;
  //      console.log(position.coords.latitude);
  //      console.log(position.coords.longitude);
  //       this.lat = position.coords.latitude;
  //       this.long = position.coords.longitude;
        
  //      // this.getAddress();
  //     });
  //  // }   
  // }
  
  // showError(error) {
  //   console.log("Location Not Found !!!");
  // }

  getAddress() {
    this.googlemapsService.getCurrentLocation(this.lat, this.long).subscribe(
      res => {
        this.location = res.address;
        console.log(this.location);
        this.homeService.getlocationName(this.location.toString().trim()).subscribe(
          res => {
            
            this.locationid = res['result'].id;
            console.log(this.locationid);
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  getCategoryList() {
    this.homeService.getcategoryList().subscribe(
      res => {
        this.categoryList = res.result;
      },
      error => {
        console.log(error);
      }
    );
  }

  getLocationApi() {
    this.homeService.getlocationapi().subscribe(
      res => {
        this.locationList = res['result'];
      },
      error => {
        console.log(error);
      }
    );
  }

  recentService() {
    this.homeService.recentService().subscribe(
      res => {

        this.recentServices = res['result'];
      },
      error => {
        console.log(error);
      }
    );
  }





}
