import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ItineraryService } from '../itinerary.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../shared/loading/loading.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  itineraryId: string;
  itineraryDetails: any;
  isLikeRequestPending: boolean;
  userEmail: string;
  errorMessage: string;
  visibilityKey: string;
  visibilityKeyId: string;
  showVisibilityKey = false;
  subscriptions = new Subscription();

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private itineraryService: ItineraryService, private loadingService: LoadingService,
    private userService: UserService) { }

  ngOnInit() {
    this.loadingService.enableLoadingMask();
    this.userService.userEmailObservable.subscribe((userEmail: string) => {
      this.userEmail = userEmail;
      this.subscriptions.add(this.activatedRoute.params.subscribe((params: any) => {
        this.itineraryId = params.id;
        this.visibilityKeyId = params.visibilityKey;
        this.getItineraryDetails();
      }));
    });
  }

  getItineraryDetails() {
    this.subscriptions.add(this.itineraryService.getItineraryDetails(this.itineraryId).subscribe(
      (data: any) => {
        this.loadingService.disableLoadingMask();
        if (data.email !== this.userEmail && !data.public) {
          if (typeof this.visibilityKeyId === 'undefined') {
            this.errorMessage = `This is a private Itinerary. Please request access from the itinerary owner.`;
            return;
          } else {
            this.itineraryDetails = data;
            this.visibilityKey = this.itineraryDetails.visibilityKey;
            if (!this.validateVisibilityKey()) {
              this.errorMessage = `Incorrect Visibility Key.`;
              return;
            }
            return;
          }
        }
        this.itineraryDetails = data;
        this.visibilityKey = this.itineraryDetails.visibilityKey;
      }
    ));
  }

  validateVisibilityKey() {
    if (this.itineraryDetails.visibilityKey) {
      debugger;
      if (this.visibilityKeyId === this.itineraryDetails.visibilityKey) {
        return true;
      } else {
        return false;
      }
    }
  }

  editItinerary() {
    console.log('Edit has been clicked');
    this.itineraryService.editItinerary = true;
    this.itineraryService.itineraryObj = this.itineraryService.getUiItineraryModelFromRaw(this.itineraryDetails);
    this.router.navigateByUrl('itinerary/edit-itinerary/info');
  }

  likeItinerary() {
    if (!this.isLikeRequestPending) {
      this.loadingService.enableLoadingMask();
      this.isLikeRequestPending = true;
      this.itineraryDetails.likes++;
      this.itineraryService.updateItinerary(this.itineraryDetails.id, this.itineraryDetails).subscribe(
        (data) => {
          console.log('The itinerary has been updated:', data);
          this.itineraryDetails = data;
          this.isLikeRequestPending = false;
          this.loadingService.disableLoadingMask();
        },
        (error) => {
          this.isLikeRequestPending = false;
          console.error('An error has occurred:', error);
        }
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
