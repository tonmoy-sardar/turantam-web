import { TestBed, inject } from '@angular/core/testing';

import { AllcategoryService } from './allcategory.service';

describe('AllcategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllcategoryService]
    });
  });

  it('should be created', inject([AllcategoryService], (service: AllcategoryService) => {
    expect(service).toBeTruthy();
  }));
});
