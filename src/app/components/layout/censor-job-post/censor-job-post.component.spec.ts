import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CensorJobPostComponent } from './censor-job-post.component';

describe('CensorJobPostComponent', () => {
  let component: CensorJobPostComponent;
  let fixture: ComponentFixture<CensorJobPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CensorJobPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CensorJobPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
