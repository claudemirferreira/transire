import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FecharVendaComponent } from './fechar-venda.component';

describe('FecharVendaComponent', () => {
  let component: FecharVendaComponent;
  let fixture: ComponentFixture<FecharVendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FecharVendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FecharVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
