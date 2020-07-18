import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequisitionsPage } from './requisitions.page';

describe('RequisitionsPage', () => {
  let component: RequisitionsPage;
  let fixture: ComponentFixture<RequisitionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequisitionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
