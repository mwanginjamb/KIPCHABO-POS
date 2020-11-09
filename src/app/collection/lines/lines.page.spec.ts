import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LinesPage } from './lines.page';

describe('LinesPage', () => {
  let component: LinesPage;
  let fixture: ComponentFixture<LinesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LinesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
