import { TestBed } from '@angular/core/testing';

import { CashDepositService } from './cash-deposit.service';

describe('CashDepositService', () => {
  let service: CashDepositService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashDepositService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
