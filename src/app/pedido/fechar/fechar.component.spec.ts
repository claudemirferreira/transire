import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FecharComponent } from './fechar.component';

describe('FecharComponent', () => {
  let component: FecharComponent;
  let fixture: ComponentFixture<FecharComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FecharComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FecharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
