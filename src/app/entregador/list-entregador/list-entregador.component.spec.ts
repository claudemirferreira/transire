import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEntregadorComponent } from './list-entregador.component';

describe('ListEntregadorComponent', () => {
  let component: ListEntregadorComponent;
  let fixture: ComponentFixture<ListEntregadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEntregadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEntregadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
