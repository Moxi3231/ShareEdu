import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextbookComponent } from './textbook.component';

describe('TextbookComponent', () => {
  let component: TextbookComponent;
  let fixture: ComponentFixture<TextbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
