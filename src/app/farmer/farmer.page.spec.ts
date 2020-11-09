import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FarmerPage } from './farmer.page';

describe('FarmerPage', () => {
  let component: FarmerPage;
  let fixture: ComponentFixture<FarmerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
