import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteContactDetailComponent } from './delete-contact-detail.component';

describe('DeleteContactDetailComponent', () => {
  let component: DeleteContactDetailComponent;
  let fixture: ComponentFixture<DeleteContactDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteContactDetailComponent]
    });
    fixture = TestBed.createComponent(DeleteContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
