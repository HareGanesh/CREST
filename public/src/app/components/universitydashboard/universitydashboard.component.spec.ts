import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitydashboardComponent } from './universitydashboard.component';

describe('UniversitydashboardComponent', () => {
  let component: UniversitydashboardComponent;
  let fixture: ComponentFixture<UniversitydashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversitydashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversitydashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
