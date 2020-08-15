import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyReportPage } from './daily-report.page';

describe('DailyReportPage', () => {
  let component: DailyReportPage;
  let fixture: ComponentFixture<DailyReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
