import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityroleComponent } from './universityrole.component';

describe('UniversityroleComponent', () => {
  let component: UniversityroleComponent;
  let fixture: ComponentFixture<UniversityroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
