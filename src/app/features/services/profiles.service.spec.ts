/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProfilesService } from './profiles.service';

describe('Service: Profiles', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfilesService]
    });
  });

  it('should ...', inject([ProfilesService], (service: ProfilesService) => {
    expect(service).toBeTruthy();
  }));
});
