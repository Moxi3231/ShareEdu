import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTextbookComponent } from './admin-textbook.component';

describe('AdminTextbookComponent', () => {
  let component: AdminTextbookComponent;
  let fixture: ComponentFixture<AdminTextbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTextbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTextbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
