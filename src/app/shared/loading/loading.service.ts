import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  showLoadingMask = false;
  loadingMessage = '';

  constructor() { }

  enableLoadingMask(message?: string): void {
    this.showLoadingMask = true;
    if (typeof message !== 'undefined') {
      this.loadingMessage = message;
    }
  }

  disableLoadingMask(): void {
    this.showLoadingMask = false;
    this.loadingMessage = '';
  }
}
