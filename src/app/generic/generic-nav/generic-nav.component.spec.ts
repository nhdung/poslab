import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericNavComponent } from './generic-nav.component';

describe('GenericNavComponent', () => {
  let component: GenericNavComponent;
  let fixture: ComponentFixture<GenericNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
