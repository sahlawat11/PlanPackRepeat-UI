/// <reference types='@types/googlemaps' />
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent, PolylineManager, GoogleMapsAPIWrapper } from '@agm/core';
// import {} from '@types/googlemaps';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
  providers: [PolylineManager, GoogleMapsAPIWrapper]
})
export class GoogleMapsComponent implements OnInit {

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  @ViewChild('search', {static: false}) searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, polylineManager: PolylineManager,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
 
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          debugger;
          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

   // Get Current Location Coordinates
   private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
 
 
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
 
}



// use the Complex Ploylines: https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/polyline-complex
  // deconsting a vertix: https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/deconste-vertex-menu
  // use this: https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/aerial-simple

  // Finding the address using lats and logs: https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/geocoding-reverse
  // if someone wants to check the directions: https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/directions-panel
  // draggable directions: https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/directions-draggable
  // toggle street view: https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/streetview-overlays

