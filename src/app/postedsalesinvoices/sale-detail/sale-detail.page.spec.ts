import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaleDetailPage } from './sale-detail.page';

describe('SaleDetailPage', () => {
  let component: SaleDetailPage;
  let fixture: ComponentFixture<SaleDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaleDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
