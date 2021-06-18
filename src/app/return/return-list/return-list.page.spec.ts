import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReturnListPage } from './return-list.page';

describe('ReturnListPage', () => {
  let component: ReturnListPage;
  let fixture: ComponentFixture<ReturnListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
