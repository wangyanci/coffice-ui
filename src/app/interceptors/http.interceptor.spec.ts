import { TestBed } from '@angular/core/testing';

import { CommonInterceptor } from './http.interceptor';

describe('HttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CommonInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CommonInterceptor = TestBed.inject(CommonInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
