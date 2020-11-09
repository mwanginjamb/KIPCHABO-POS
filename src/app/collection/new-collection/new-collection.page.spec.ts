import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewCollectionPage } from './new-collection.page';

describe('NewCollectionPage', () => {
  let component: NewCollectionPage;
  let fixture: ComponentFixture<NewCollectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCollectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewCollectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
