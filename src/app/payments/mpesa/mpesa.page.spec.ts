import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MpesaPage } from './mpesa.page';

describe('MpesaPage', () => {
  let component: MpesaPage;
  let fixture: ComponentFixture<MpesaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpesaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MpesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
