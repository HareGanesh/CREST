import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventstudentapprovallistComponent } from './eventstudentapprovallist.component';

describe('EventstudentapprovallistComponent', () => {
  let component: EventstudentapprovallistComponent;
  let fixture: ComponentFixture<EventstudentapprovallistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventstudentapprovallistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventstudentapprovallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
