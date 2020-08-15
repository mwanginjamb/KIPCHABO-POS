import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyreportPage } from './dailyreport.page';

describe('DailyreportPage', () => {
  let component: DailyreportPage;
  let fixture: ComponentFixture<DailyreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
