import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterLocationsComponent } from './filter-locations.component';

describe('FilterLocationsComponent', () => {
  let component: FilterLocationsComponent;
  let fixture: ComponentFixture<FilterLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
