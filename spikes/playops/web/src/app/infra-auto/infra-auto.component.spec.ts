import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraAutoComponent } from './infra-auto.component';

describe('AppAutoComponent', () => {
  let component: InfraAutoComponent;
  let fixture: ComponentFixture<InfraAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfraAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfraAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
