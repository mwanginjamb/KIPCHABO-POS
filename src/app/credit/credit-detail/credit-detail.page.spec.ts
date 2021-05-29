import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreditDetailPage } from './credit-detail.page';

describe('CreditDetailPage', () => {
  let component: CreditDetailPage;
  let fixture: ComponentFixture<CreditDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreditDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
