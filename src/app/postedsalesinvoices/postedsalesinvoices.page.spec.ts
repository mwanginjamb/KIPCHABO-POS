import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostedsalesinvoicesPage } from './postedsalesinvoices.page';

describe('PostedsalesinvoicesPage', () => {
  let component: PostedsalesinvoicesPage;
  let fixture: ComponentFixture<PostedsalesinvoicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostedsalesinvoicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostedsalesinvoicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
