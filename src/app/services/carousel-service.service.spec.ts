import { TestBed } from '@angular/core/testing';

import { CarouselViewService } from './carousel-view.service';

xdescribe('CarouselServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarouselViewService = TestBed.get(CarouselViewService);
    expect(service).toBeTruthy();
  });
});
