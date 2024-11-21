import { TestBed } from '@angular/core/testing';

import { LevelOfEducationService } from './level-of-education.service';

describe('LevelOfEducationService', () => {
  let service: LevelOfEducationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelOfEducationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
