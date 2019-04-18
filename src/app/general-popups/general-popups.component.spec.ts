import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralPopupsComponent } from './general-popups.component';

describe('GeneralPopupsComponent', () => {
  let component: GeneralPopupsComponent;
  let fixture: ComponentFixture<GeneralPopupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralPopupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralPopupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
