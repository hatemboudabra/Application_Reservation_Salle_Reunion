import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRommComponent } from './add-romm.component';

describe('AddRommComponent', () => {
  let component: AddRommComponent;
  let fixture: ComponentFixture<AddRommComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRommComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
