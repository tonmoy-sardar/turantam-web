import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { categoryComponent } from './category.component';

describe('categoryComponent', () => {
  let component: categoryComponent;
  let fixture: ComponentFixture<categoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ categoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(categoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
