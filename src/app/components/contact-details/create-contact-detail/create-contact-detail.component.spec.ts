import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContactDetailComponent } from './create-contact-detail.component';

describe('CreateContactDetailComponent', () => {
  let component: CreateContactDetailComponent;
  let fixture: ComponentFixture<CreateContactDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateContactDetailComponent]
    });
    fixture = TestBed.createComponent(CreateContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
