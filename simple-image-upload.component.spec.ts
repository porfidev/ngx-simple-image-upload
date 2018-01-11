import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleImageUploadComponent } from './simple-image-upload.component';

describe('SimpleImageUploadComponent', () => {
  let component: SimpleImageUploadComponent;
  let fixture: ComponentFixture<SimpleImageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleImageUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
