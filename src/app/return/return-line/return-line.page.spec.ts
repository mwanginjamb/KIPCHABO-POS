import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReturnLinePage } from './return-line.page';

describe('ReturnLinePage', () => {
  let component: ReturnLinePage;
  let fixture: ComponentFixture<ReturnLinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnLinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnLinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
