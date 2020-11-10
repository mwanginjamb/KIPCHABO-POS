import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TakeIdfrontComponent } from './take-idfront.component';

describe('TakeIdfrontComponent', () => {
  let component: TakeIdfrontComponent;
  let fixture: ComponentFixture<TakeIdfrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeIdfrontComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TakeIdfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
