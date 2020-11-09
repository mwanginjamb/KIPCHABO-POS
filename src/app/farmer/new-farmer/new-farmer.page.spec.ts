import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewFarmerPage } from './new-farmer.page';

describe('NewFarmerPage', () => {
  let component: NewFarmerPage;
  let fixture: ComponentFixture<NewFarmerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFarmerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewFarmerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
