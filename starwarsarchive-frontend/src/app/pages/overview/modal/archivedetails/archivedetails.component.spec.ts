import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedetailsComponent } from './archivedetails.component';

describe('ArchivedetailsComponent', () => {
  let component: ArchivedetailsComponent;
  let fixture: ComponentFixture<ArchivedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
