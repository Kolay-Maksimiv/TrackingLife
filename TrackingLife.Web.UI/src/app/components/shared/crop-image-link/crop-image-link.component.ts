import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from 'app/services/toast.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-crop-image-link',
  templateUrl: './crop-image-link.component.html',
  styleUrls: ['./crop-image-link.component.css']
})
export class CropImageLinkComponent implements OnInit {
  @Output() uploadImage = new EventEmitter<any>();
  @Output() deleteImage = new EventEmitter();
  @Output() croppedImage = new EventEmitter<any>();
  @Output() newBannerImageSelected = new EventEmitter<boolean>();

  @Input() roundCropper = false;
  @Input() aspectRatio = 1;
  @Input() previousImage: any;
  @Input() isImageExist = false;

  imageChangedEvent: any;
  file: any;
  image: any;
  isLoading = false;

  constructor(private toastService: ToastService) { }

  ngOnInit() { }

  fileChangeEvent(event: any): void {
    // $('#bannerImageUrl').hide();
    let image = event.target.files[0];
    let isValid = true;
    if (image.type !== 'image/jpeg' && image.type !== 'image/png' && image.type !== 'image/jpg') {
      this.toastService.showError("Wrong File Format");
      isValid = false;
    }

    if (image.size > 2000000) {
      this.toastService.showError("Wrong Image Size");
      isValid = false;
    }

    const img = new Image();
    img.src = window.URL.createObjectURL(image);
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      img.onload = () => {
        if (img.width < 100 && img.height < 50) {
          this.toastService.showError("Wrong Image Scale");
        } else if (isValid) {
          this.isLoading = true;
          this.imageChangedEvent = event;
          this.previousImage = null;
          this.newBannerImageSelected.emit(true);
        }
      };
    };
  }

  imageCropped(event: ImageCroppedEvent) {
    this.file = event.file;
    this.image = event.base64;
    this.save();
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    this.isLoading = false;
    // cropper ready
  }

  loadImageFailed() {
    this.isLoading = false;
    this.toastService.showError("Something Went Wrong");
  }

  uploadFile(): void {
    const formData = new FormData();
    formData.append("file", this.file);
    this.uploadImage.emit(formData);
  }

  save(): void {
    this.croppedImage.emit(this.image);
    this.uploadFile();
  }

  cancel(event: any): void {
    // $('#bannerImageUrl').show();
    this.isLoading = true;
    this.imageChangedEvent = event;
    this.previousImage = null;
    this.uploadImage = null;
    this.newBannerImageSelected.emit(true);
    this.deleteImage.emit();
  }

  delete(): void {
    this.deleteImage.emit();
  }
}
