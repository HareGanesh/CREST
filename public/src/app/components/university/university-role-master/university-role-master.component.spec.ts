import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityRoleMasterComponent } from './university-role-master.component';

describe('UniversityRoleMasterComponent', () => {
  let component: UniversityRoleMasterComponent;
  let fixture: ComponentFixture<UniversityRoleMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityRoleMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityRoleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
