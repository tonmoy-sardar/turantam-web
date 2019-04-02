import { Injectable, NgZone } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { MapsAPILoader } from '@agm/core';
import { Observable, Observer } from 'rxjs';
import { } from '@types/googlemaps';
declare var google: any;

@Injectable()
export class GooglemapsService extends GoogleMapsAPIWrapper {
    zoom: any;
    currentLocation: any
    constructor(
        private __loader: MapsAPILoader,
        private __zone: NgZone
    ) {
        super(__loader, __zone);
    }

    getLatLan(address: string) {
       // console.log('Getting Address - ', address);
        let geocoder = new google.maps.Geocoder();
        return Observable.create(observer => {
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    observer.next(results[0].geometry.location);
                } else {
                   // console.log('Error - ', results, ' & Status - ', status);
                    observer.next({});                    
                }
                observer.complete();
            });
        })
    }



    getCurrentLocation(lat, long) {
        let geocoder = new google.maps.Geocoder;
        let latlng = { lat: lat, lng: long };
        return Observable.create(observer => {
            geocoder.geocode(
                { 'latLng': latlng },
                function (results, status) {

                    if (results[0]) {
                        var add = results[0].formatted_address;
                        var value = add.split(",");

                        this.count = value.length;
                        this.country = value[this.count - 1];
                        this.state = value[this.count - 2];
                        this.city = value[this.count - 3];
                        observer.next({ address: this.city });

                    }
                    else {
                        console.log('No results found');
                        observer.next({});
                    }
                    observer.complete();

                }
            );
        })

    }


}
