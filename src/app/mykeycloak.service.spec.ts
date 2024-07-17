import { TestBed } from '@angular/core/testing';

import { MykeycloakService } from './mykeycloak.service';

describe('MykeycloakService', () => {
  let service: MykeycloakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MykeycloakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
