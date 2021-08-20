import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CashDepositDetailPage } from './cash-deposit-detail.page';

describe('CashDepositDetailPage', () => {
  let component: CashDepositDetailPage;
  let fixture: ComponentFixture<CashDepositDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashDepositDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CashDepositDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
