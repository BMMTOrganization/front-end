import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevPortalComponent } from './dev-portal.component';

describe('DevPortalComponent', () => {
  let component: DevPortalComponent;
  let fixture: ComponentFixture<DevPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
