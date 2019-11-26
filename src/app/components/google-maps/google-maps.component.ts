/// <reference types='@types/googlemaps' />
import { Component, OnInit, ViewChild, ElementRef, NgZone, Input } from '@angular/core';
import { MapsAPILoader, MouseEvent, PolylineManager, GoogleMapsAPIWrapper } from '@agm/core';
import { LoadingService } from '../../shared/loading/loading.service';
import { ItineraryService } from '../../itinerary/itinerary.service';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { Destinations } from '../../models/itinerary';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
  providers: [PolylineManager, GoogleMapsAPIWrapper]
})
export class GoogleMapsComponent implements OnInit {

  selectedLocations = [];

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  mapLoaded: boolean;
  destinationCreationCounter = 0;
  private geoCoder;

  @ViewChild('search', {static: false}) searchElementRef: ElementRef;
  @Input() dialogRef: ReplaySubject<any>;

  constructor(private mapsAPILoader: MapsAPILoader, polylineManager: PolylineManager,
    private ngZone: NgZone, private loadingService: LoadingService, private itineraryService: ItineraryService) { }

  ngOnInit() {
    this.initOnSaveEventSubscription();
    this.loadGoogleMaps();
  }

  initOnSaveEventSubscription(): void {
    this.itineraryService.onSaveMapsLocationsStream.subscribe((data: boolean) => {
      if (!!data) {
        this.loadingService.enableLoadingMask('Saving');
        console.log('The itinerary has been saved, fetching street address and pix now.', data);
        if (this.selectedLocations.length > 0) {
          for (const location of this.selectedLocations) {
            this.destinationCreationCounter++;
            this.getAddressFromCoordinates(location.lat, location.lng).subscribe((data: string | null) => {
              this.destinationCreationCounter--;
              const streetAddress = data;
              this.itineraryService.savedDestinations.push(
                { latitude: location.lat, longitude: location.lng,
                  streetAddress: streetAddress, source: 'maps', name: '', date: '', time: ''}
              );
              console.log('DESTINATION COUNTER.............:', this.destinationCreationCounter);
              if (this.destinationCreationCounter === 0) {  // last location in the array
                this.loadingService.disableLoadingMask();
                this.dialogRef.next(false);
              }
              });
          }
        } else {
          this.loadingService.disableLoadingMask();
          this.dialogRef.next(false);
        }
      }
      },
      (error: any) => {
        console.log('Error occurred on save event.', error);
        this.loadingService.disableLoadingMask();
    });
  }


  loadGoogleMaps(): void {
    this.loadingService.enableLoadingMask('Loading Google Maps');
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          console.log('this is running right now');
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
          this.address = place.formatted_address;
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
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          this.loadingService.disableLoadingMask();
        } else {
          console.error('No results found');
          this.loadingService.disableLoadingMask();
        }
      } else {
        console.error('Geocoder failed due to: ' + status);
        this.loadingService.disableLoadingMask();
      }

    });
  }

  getAddressFromCoordinates(latitude, longitude): Observable<any> {
    const streetAddressSubject = new Subject<any>();
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
          const address = this.getStreetAddress(results);
          streetAddressSubject.next(address);
          return address;
      } else {
        console.error('Geocoder failed due to: ' + status);
        streetAddressSubject.next(null);
      }
    });
    return streetAddressSubject.asObservable();
  }

  getStreetAddress(locationResults: Array<any>) {
    console.log('THESE ARE ALL THE LOCATIONS:', locationResults);
    let locationStreetAddress: string;
    if (locationResults.length > 0) {
      for (const location of locationResults) {
        if (location.types.indexOf("street_address") > -1) {
          locationStreetAddress = location.formatted_address;
        }
      }
    }
    return locationStreetAddress;
  }

  selectLocation(event: any) {
    this.selectedLocations.push(
      { lat: event.coords.lat, lng: event.coords.lng }
    );
  }

  removeLocation(location: any) {
    const index = this.itineraryService.savedDestinations.indexOf(location);
    if (typeof index !== 'undefined' || index !== null) {
      this.itineraryService.savedDestinations.splice(index, 1);
    }
  }

  get savedDestinations() {
    return this.itineraryService.savedDestinations;
  }
 
}



// use the Complex Ploylines: https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/polyline-complex
  // deconsting a vertix: https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/deconste-vertex-menu
  // use this: https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/aerial-simple

  // Finding the address using lats and logs: https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/geocoding-reverse
  // if someone wants to check the directions: https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/directions-panel
  // draggable directions: https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/directions-draggable
  // toggle street view: https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/streetview-overlays

