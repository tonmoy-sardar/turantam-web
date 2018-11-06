import { TestBed, inject } from '@angular/core/testing';

import { MyordersService } from './myorders.service';

describe('MyordersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyordersService]
    });
  });

  it('should be created', inject([MyordersService], (service: MyordersService) => {
    expect(service).toBeTruthy();
  }));
});
