import { TestBed } from '@angular/core/testing';

import { StockdetailService } from './stockdetail.service';

describe('StockdetailService', () => {
  let service: StockdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
