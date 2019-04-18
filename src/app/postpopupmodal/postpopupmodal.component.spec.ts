import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostpopupmodalComponent } from './postpopupmodal.component';

describe('PostpopupmodalComponent', () => {
  let component: PostpopupmodalComponent;
  let fixture: ComponentFixture<PostpopupmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostpopupmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostpopupmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
