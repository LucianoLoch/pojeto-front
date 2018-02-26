import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidlistComponent } from './bidlist.component';

describe('BidlistComponent', () => {
  let component: BidlistComponent;
  let fixture: ComponentFixture<BidlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
