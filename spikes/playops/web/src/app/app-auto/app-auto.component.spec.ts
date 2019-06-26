import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAutoComponent } from './app-auto.component';

describe('AppAutoComponent', () => {
  let component: AppAutoComponent;
  let fixture: ComponentFixture<AppAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
