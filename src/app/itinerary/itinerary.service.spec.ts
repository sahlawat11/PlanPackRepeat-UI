import { TestBed } from '@angular/core/testing';

import { ItineraryService } from './itinerary.service';

xdescribe('ItineraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItineraryService = TestBed.get(ItineraryService);
    expect(service).toBeTruthy();
  });
});
