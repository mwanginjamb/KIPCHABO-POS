import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReturnCardPage } from './return-card.page';

describe('ReturnCardPage', () => {
  let component: ReturnCardPage;
  let fixture: ComponentFixture<ReturnCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
