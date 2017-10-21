import { TestBed, inject } from '@angular/core/testing';

import { UniversalService } from './universal.interceptor';

describe('UniversalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniversalService]
    });
  });

  it('should be created', inject([UniversalService], (service: UniversalService) => {
    expect(service).toBeTruthy();
  }));
});
