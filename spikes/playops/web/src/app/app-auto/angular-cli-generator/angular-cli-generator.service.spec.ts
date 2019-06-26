import { TestBed, inject } from '@angular/core/testing';

import { AngularCliGeneratorService } from './angular-cli-generator.service';

describe('AngularCliGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularCliGeneratorService]
    });
  });

  it('should be created', inject([AngularCliGeneratorService], (service: AngularCliGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
