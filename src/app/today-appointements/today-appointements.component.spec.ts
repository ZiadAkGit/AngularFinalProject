import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayAppointementsComponent } from './today-appointements.component';

describe('TodayAppointementsComponent', () => {
  let component: TodayAppointementsComponent;
  let fixture: ComponentFixture<TodayAppointementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodayAppointementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayAppointementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
