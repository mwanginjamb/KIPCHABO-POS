import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IdScannerPage } from './id-scanner.page';

describe('IdScannerPage', () => {
  let component: IdScannerPage;
  let fixture: ComponentFixture<IdScannerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdScannerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IdScannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
