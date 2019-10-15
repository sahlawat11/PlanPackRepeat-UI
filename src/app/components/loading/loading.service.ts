import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  showLoadingMask = false;

  constructor() { }

  enableLoadingMask(): void {
    this.showLoadingMask = true;
  }

  disableLoadingMask(): void {
    this.showLoadingMask = false;
  }
}
