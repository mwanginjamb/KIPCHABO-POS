import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewRequisitionPage } from './new-requisition.page';

describe('NewRequisitionPage', () => {
  let component: NewRequisitionPage;
  let fixture: ComponentFixture<NewRequisitionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRequisitionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewRequisitionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
