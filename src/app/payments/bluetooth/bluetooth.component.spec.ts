import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BluetoothComponent } from './bluetooth.component';

describe('BluetoothComponent', () => {
  let component: BluetoothComponent;
  let fixture: ComponentFixture<BluetoothComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluetoothComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BluetoothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
