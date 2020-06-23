import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggerConsoleComponent } from './logger-console.component';

describe('LoggerConsoleComponent', () => {
  let component: LoggerConsoleComponent;
  let fixture: ComponentFixture<LoggerConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggerConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggerConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
