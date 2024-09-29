import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCourseComponent } from './single-course.component';

describe('SingleCourseComponent', () => {
  let component: SingleCourseComponent;
  let fixture: ComponentFixture<SingleCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleCourseComponent]
    });
    fixture = TestBed.createComponent(SingleCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
