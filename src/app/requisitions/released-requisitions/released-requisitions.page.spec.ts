import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReleasedRequisitionsPage } from './released-requisitions.page';

describe('ReleasedRequisitionsPage', () => {
  let component: ReleasedRequisitionsPage;
  let fixture: ComponentFixture<ReleasedRequisitionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleasedRequisitionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReleasedRequisitionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
