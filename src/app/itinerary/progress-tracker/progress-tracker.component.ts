import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-tracker',
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.css']
})
export class ProgressTrackerComponent implements OnInit {

  trackerOptions = [
    {
      step: 'endpoint', stepReady: false,
      section: 'platform-progress', stepCompleted: false
    },
    {
      step: 'assets', stepReady: false,
      section: 'assets-progress', stepCompleted: false
    },
    {
      step: 'instruction', stepReady: false,
      section: 'format-progress', stepCompleted: false
    },
    {
      step: 'metadata', stepReady: false,
      section: 'format-progress', stepCompleted: false
    },
    {
      step: 'instructions', stepReady: false,
      section: 'format-progress', stepCompleted: false
    },
    {
      step: 'schedule', stepReady: false,
      section: 'schedule-progress', stepCompleted: false
    },
    {
      step: 'review', stepReady: false,
      section: 'review-progress', stepCompleted: false
    },
    {
      step: 'submit', stepReady: false,
      section: 'NA', stepCompleted: false
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  goToStep() {
    console.log('This has been called');
  }

}
