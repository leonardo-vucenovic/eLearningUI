import { TestBed } from '@angular/core/testing';

import { UnderLevelOfEducationService } from './under-level-of-education.service';

describe('UnderLevelOfEducationService', () => {
  let service: UnderLevelOfEducationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnderLevelOfEducationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
