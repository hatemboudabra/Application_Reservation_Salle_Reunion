import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMeetingusComponent } from './list-meetingus.component';

describe('ListMeetingusComponent', () => {
  let component: ListMeetingusComponent;
  let fixture: ComponentFixture<ListMeetingusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMeetingusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMeetingusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
