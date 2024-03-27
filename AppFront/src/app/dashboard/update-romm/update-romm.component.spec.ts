import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRommComponent } from './update-romm.component';

describe('UpdateRommComponent', () => {
  let component: UpdateRommComponent;
  let fixture: ComponentFixture<UpdateRommComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRommComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
