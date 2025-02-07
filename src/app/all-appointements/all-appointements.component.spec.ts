import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAppointementsComponent } from './all-appointements.component';

describe('AllAppointementsComponent', () => {
  let component: AllAppointementsComponent;
  let fixture: ComponentFixture<AllAppointementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllAppointementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAppointementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
