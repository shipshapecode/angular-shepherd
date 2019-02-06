import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShepherdComponent } from './shepherd.component';

describe('ShepherdComponent', () => {
  let component: ShepherdComponent;
  let fixture: ComponentFixture<ShepherdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShepherdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShepherdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
