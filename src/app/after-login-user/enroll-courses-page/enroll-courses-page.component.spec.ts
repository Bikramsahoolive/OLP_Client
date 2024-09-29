import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollCoursesPageComponent } from './enroll-courses-page.component';

describe('EnrollCoursesPageComponent', () => {
  let component: EnrollCoursesPageComponent;
  let fixture: ComponentFixture<EnrollCoursesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollCoursesPageComponent]
    });
    fixture = TestBed.createComponent(EnrollCoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
