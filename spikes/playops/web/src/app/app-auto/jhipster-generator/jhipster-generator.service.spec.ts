import { TestBed, inject } from '@angular/core/testing';

import { JhipsterGeneratorService } from './jhipster-generator.service';

describe('JhipsterGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JhipsterGeneratorService]
    });
  });

  it('should be created', inject([JhipsterGeneratorService], (service: JhipsterGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
