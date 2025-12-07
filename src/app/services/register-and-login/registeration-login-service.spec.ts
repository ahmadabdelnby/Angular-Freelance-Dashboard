import { TestBed } from '@angular/core/testing';

import { RegisterationLoginService } from './registeration-login-service';

describe('RegisterationLoginService', () => {
  let service: RegisterationLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterationLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
