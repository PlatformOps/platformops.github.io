import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JhipsterGeneratorComponent } from './jhipster-generator.component';

describe('JhipsterGeneratorComponent', () => {
  let component: JhipsterGeneratorComponent;
  let fixture: ComponentFixture<JhipsterGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JhipsterGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JhipsterGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
