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
  locationId: any;
  catid: any;
  catname: string;
  defaultLocation: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private googlemapsService: GooglemapsService,
    private homeService: HomeService
  ) {
    this.catname = "";
  }

  ngOnInit() {
    this.imageBaseUrl = environment.imageBaseUrl;
   if(localStorage.getItem('myCurrentLocationId')) {
    this.locationId = localStorage.getItem('myCurrentLocationId');
   }
   else {
    this.locationId = 2;
    this.getLocation();
   }
    
    this.getCategoryList();
    this.getLocationApi();
    this.recentService();
    //this.locationId = 2;

  }


  gotoLocation(id) {
    this.locationId = id;
    localStorage.setItem('myCurrentLocationId', this.locationId);
  }

  gotoSearch(cityid, catname) {
    this.homeService.getcategoryName(catname).subscribe(
      res => {
        if (res['result'] != null) {
          this.catid = res['result']['id'];
         // this.router.navigateByUrl('/category/' + this.catid + '/' + cityid);
         this.router.navigateByUrl('/category/' + this.catid);
        }
        else {
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        this.getAddress();
      },
        // function (error) {
          error => {
          if (error.code == error.PERMISSION_DENIED)
            console.log("you denied me :-(");
          localStorage.setItem('myCurrentLocationId', "2");
          this.toastr.error('Your location is Disabled. For now your default location will be Howrah you can change location from Dropdown ', '', {
            timeOut: 6000,
          });

        });
    }
  }



  getAddress() {
    this.googlemapsService.getCurrentLocation(this.lat, this.long).subscribe(
      res => {
        this.location = res.address;
       // console.log(this.location);
        this.homeService.getlocationName(this.location.toString().trim()).subscribe(
          res => {
            if (res['result'] == null) {
              this.toastr.error('Turantam Services is not available in your current location. You can change the Location From Dropdown', '', {
                timeOut: 3000,
              });
              localStorage.setItem('myCurrentLocationId', "2");
              this.locationId = localStorage.getItem('myCurrentLocationId');
            }
            else {
             // console.log(res['result'])
              localStorage.setItem('myCurrentLocationId', res['result'].id);
              this.locationId = localStorage.getItem('myCurrentLocationId');
            //  console.log(this.locationId);
            }

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
        console.log(this.categoryList);
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
       // console.log(this.locationList);
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
        //console.log(this.recentServices);
      },
      error => {
        console.log(error);
      }
    );
  }

}
