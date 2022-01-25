import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropImageCategoryComponent } from './crop-image-category.component';

describe('CropImageCategoryComponent', () => {
  let component: CropImageCategoryComponent;
  let fixture: ComponentFixture<CropImageCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropImageCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropImageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
