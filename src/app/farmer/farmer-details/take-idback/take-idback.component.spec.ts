import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TakeIdbackComponent } from './take-idback.component';

describe('TakeIdbackComponent', () => {
  let component: TakeIdbackComponent;
  let fixture: ComponentFixture<TakeIdbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeIdbackComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TakeIdbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
