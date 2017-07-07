import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnivUserRegisterComponent } from './univ-user-register.component';

describe('UnivUserRegisterComponent', () => {
  let component: UnivUserRegisterComponent;
  let fixture: ComponentFixture<UnivUserRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnivUserRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnivUserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
