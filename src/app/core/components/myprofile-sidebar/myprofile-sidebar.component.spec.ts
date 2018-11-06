import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileSidebarComponent } from './myprofile-sidebar.component';

describe('MyprofileSidebarComponent', () => {
  let component: MyprofileSidebarComponent;
  let fixture: ComponentFixture<MyprofileSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyprofileSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyprofileSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
