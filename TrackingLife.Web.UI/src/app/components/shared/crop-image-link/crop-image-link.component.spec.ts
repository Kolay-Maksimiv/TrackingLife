import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropImageLinkComponent } from './crop-image-link.component';

describe('CropImageLinkComponent', () => {
  let component: CropImageLinkComponent;
  let fixture: ComponentFixture<CropImageLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropImageLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropImageLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
