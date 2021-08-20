import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CashDepositPage } from './cash-deposit.page';

describe('CashDepositPage', () => {
  let component: CashDepositPage;
  let fixture: ComponentFixture<CashDepositPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashDepositPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CashDepositPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
