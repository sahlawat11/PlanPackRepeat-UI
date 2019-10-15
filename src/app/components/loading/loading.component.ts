import { Component, OnInit } from '@angular/core';

import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    setInterval(() => {
      console.log('*****sdsdsdsdsds interval value:', this.showLoadingMask);
    }, 2000);
  }

  get showLoadingMask(): boolean {
    return this.loadingService.showLoadingMask;
  }

}
