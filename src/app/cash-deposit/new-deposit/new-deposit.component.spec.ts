import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewDepositComponent } from './new-deposit.component';

describe('NewDepositComponent', () => {
  let component: NewDepositComponent;
  let fixture: ComponentFixture<NewDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDepositComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
