import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularCliGeneratorComponent } from './angular-cli-generator.component';

describe('AngularCliGeneratorComponent', () => {
  let component: AngularCliGeneratorComponent;
  let fixture: ComponentFixture<AngularCliGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularCliGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularCliGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
