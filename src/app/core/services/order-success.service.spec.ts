import { TestBed, inject } from '@angular/core/testing';

import { OrderSuccessService } from './order-success.service';

describe('OrderSuccessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderSuccessService]
    });
  });

  it('should be created', inject([OrderSuccessService], (service: OrderSuccessService) => {
    expect(service).toBeTruthy();
  }));
});
