import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewPaymentPage } from './new-payment.page';

describe('NewPaymentPage', () => {
  let component: NewPaymentPage;
  let fixture: ComponentFixture<NewPaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPaymentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
