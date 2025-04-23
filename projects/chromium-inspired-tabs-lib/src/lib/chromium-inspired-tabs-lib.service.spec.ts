import { TestBed } from '@angular/core/testing';

import { ChromiumInspiredTabsLibService } from './chromium-inspired-tabs-lib.service';

describe('ChromiumInspiredTabsLibService', () => {
  let service: ChromiumInspiredTabsLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChromiumInspiredTabsLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
