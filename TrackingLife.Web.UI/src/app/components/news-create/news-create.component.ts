import { Component, OnInit, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NewsModel } from 'app/models/news/news.model';
import { NewsService } from 'app/services/news.service';
import { TextEditorOptions } from 'app/core/editor.options';
import { NewsForm } from './NewsForm';
import { CategoryModel } from 'app/models/category/categories.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CategoryService } from 'app/services/category.service';
import { ToastService } from 'app/services/toast.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons, NgbCalendar, NgbDate, NgbTimepicker, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NewsFileViewModel } from 'app/models/news/NewsFileViewModel.model';
import { FileViewModel } from 'app/models/news/file-view-model.model';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewsCreateComponent implements OnInit {
  error: string = null;
  public activeEditor: string;
  public newsItemFiles: Array<NewsFileViewModel> = [];
  public textOptions: Object = new TextEditorOptions().options;
  public form: FormGroup = new NewsForm().AddNewsForm;
  public isLoadFiles: boolean = false;
  public isLoading: boolean = false;
  public isRequestSend: boolean = false;
  public isDragOver: boolean = false;
  private _selectedFiles: any[] = [];
  private _filesURLs: any[] = [];
  private _images: object[] = [];
  private _fileSize = 25 * 1024 * 1024;
  @Output() uploadImage = new EventEmitter<any>();
  @Output() deleteImage = new EventEmitter();
  @Output() croppedImage = new EventEmitter<any>();

  categoriesList: CategoryModel[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  @Input() newsId: number;
  @Input() previousImage: any;
  @Input() formData: any;
  isCoverExist: boolean;
  closeResult: string;
  url: string = "";
  urlSafe: SafeResourceUrl;
  previewModalContent: any;
  file: any;
  image: any;
  news: NewsModel;
  imageChangedEvent: any = '';
  publishedFrom: any;
  publishedTo: any;
  hourFrom: number;
  hourTo: number;
  minutesFrom: number;
  minutesTo: number;
  isValidDate = true;
  isValidTime = true;
  isValidPublishTo: boolean = true;
  categoriesValid = true;
  showLoader: boolean = false;
  minDate = undefined;
  isPublish: boolean = false;
  isValidMsgTitle: boolean = true;
  isValidMsgText: boolean = true;
  isShowPublishFrom: boolean = false;

  editorOptions = {};

  fileChangeEvent(event: any): void {
    let image = event.target.files[0];
    let isValid = true;
    if (image.type !== 'image/jpeg' && image.type !== 'image/png' && image.type !== 'image/jpg') {
      this.toastService.showError("Wrong file format");
      isValid = false;
    }

    if (image.size > 2000000) {
      this.toastService.showError("Wrong image size");
      isValid = false;
    }

    const img = new Image();
    img.src = window.URL.createObjectURL(image);
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      img.onload = () => {
        if (img.width < 100 && img.height < 50) {
          this.toastService.showError("Wrong image scale");
        } else if (isValid) {
          this.isLoading = true;
          this.imageChangedEvent = event;
          this.previousImage = null;
        }
      };
    };
  }

  imageCropped(event: ImageCroppedEvent) {
    this.file = event.file;
    this.image = event.base64;
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
    this.toastService.showError("Something went wrong");
  }

  // uploadFile(): void {
  //   const formData = new FormData();
  //   formData.append("file", this.file);
  //   this.uploadImage.emit(formData);
  // }

  // save(): void {
  //   this.croppedImage.emit(this.image);
  //   this.uploadFile();
  // }

  delete(): void {
    this.deleteImage.emit();
  }

  constructor(private newsService: NewsService,
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private router: Router,
    public sanitizer: DomSanitizer,
    private toastService: ToastService,
    private calendar: NgbCalendar) {
    this.news = new NewsModel();
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
    this.publishedFrom = this.calendar.getToday();

  }

  ngOnInit() {

    this.getCategories();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    this._initContentHtmlData();

    this.editorOptions = {
      height: 500,
      menubar: false,
      resize: true,
      image_title: true,
      paste_data_images: true,
      paste_filter_drop: true,

      images_upload_url: `${environment.apiUrl}/news/upload-mage`,

      statusbar: true,
      branding: false,

      file_picker_types: 'image',
      toolbar_drawer: 'floating',
      body_class: 'tinymce-body',
      content_style: 'img { max-width: 100%; max-height: auto; }',
      plugins: [
        'paste searchreplace autolink directionality visualblocks visualchars image link toc advlist lists imagetools textpattern help charmap autoresize code link toc'
      ],
      toolbar:
        'undo redo | formatselect | link image | bold italic underline backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help'
      ,
      default_link_target: '_blank'
    }
  }

  croppedCover(image): void {
    this.formData = image;
    this.isCoverExist = true;
  }

  uploadCover(formData): void {
    this.formData = formData;
  }

  deleteCover(): void {
    // if(this._isRequestSend == false){
    //     this._isRequestSend = true;
    //     this.companyService.deleteCover(this.companyId).subscribe(() => {
    //         this._isRequestSend = false;
    //         this.alertService.showMessage(this.gT('companies.CoverDeleted'));
    //         this.company.coverUrl = this.coverPath;
    //         this.isCoverExist = false;
    //         this.showCompanyCoverModal = false;
    //         this.addCompanyCoverModal.hide();
    //     });
    // }
  }

  getCategories() {
    this.categoryService.getCategoriesListForDropDown().subscribe(
      respData => {
        this.categoriesList = respData;
        if (respData) {
          this.dropdownList = respData.map(x => { return { 'item_id': x.id, 'item_text': x.name } });
        }
      },
      error => {
        if (error.error) {
          this.toastService.showError(error.error);
        } else {
          this.toastService.showError("Some error occured");
        }
      }
    );
  }

  createNews(): void {
    this.isLoading = true;

    var selectedCategoriesIds = this.selectedItems.map(x => { return x.item_id });
    this.categoriesValid = this.categoriesList.filter(x => selectedCategoriesIds.includes(x.id)).length > 0;

    var isValidForm = this.formValidation();
    if (this.form.value && isValidForm) {
      this.showLoader = true;
      this._images.forEach(image => {
        let contentHtml = this.form.get("contentHtml").value;

        if (contentHtml != null) {
          var changedContentHtml = this.newsService.replaceAll(this.form.get("contentHtml").value, image["imageUrl"], image["imageToReplace"])
          this.form.get("contentHtml").setValue(changedContentHtml);
        }
      });

      this.form.get("categoryList").setValue(this.categoriesList.filter(x => selectedCategoriesIds.includes(x.id)));

      let sendingObj = { ...this.form.value };

      sendingObj["contentHtml"] = this.form.get('contentHtml').value;
      sendingObj["bannerImageUrl"] = this.form.get('bannerImageUrl').value;
      sendingObj["sendNotification"] = this.form.get('sendNotification').value;

      this.isPublishedSelected(event);
      sendingObj["categoryList"] = this.categoriesList.filter(x => selectedCategoriesIds.includes(x.id));
      sendingObj["level"] = this.news.level;

      if (this.news.id) {
        sendingObj["id"] = this.news.id;
        this.newsService.create({
          ...sendingObj,
          newsId: this.newsId
        }).subscribe(respData => {
          this.isLoading = false;
          this.news = new NewsModel(respData);
          if (this.formData) {
            this.newsService.upload(this.news.id, this.formData).subscribe(respData1 => {
              var model = new FileViewModel(respData1);
              this.news.bannerImageUrl = model.imageUrl;
              this.toastService.showSuccess('Changed');
              if (this.previewModalContent) {
                this.openPreview();
              } else {
                this.router.navigate(['/news']);
              }
            });
          } else {
            this.news = new NewsModel(respData)
            if (this.previewModalContent) {
              this.openPreview();
            } else {
              this.router.navigate(['/news']);
            }
          }
        },
          error => {
            console.log(error.error);
            this.error = "Some error occured";
            this.showLoader = false;
          }
        );
      } else {
        this.newsService.create({
          ...sendingObj,
          newsId: this.newsId
        }).subscribe(respData => {
          this.isLoading = false;
          this.news = new NewsModel(respData)

          if (this.formData) {
            this.newsService.upload(this.news.id, this.formData).subscribe(data => {
              var model = new FileViewModel(data);
              this.news.bannerImageUrl = model.imageUrl;

              if (this.previewModalContent) {
                this.openPreview();
              } else {
                this.router.navigate(['/news']);
              }
            });
          } else {
            if (this.previewModalContent) {
              this.openPreview();
            } else {
              this.router.navigate(['/news']);
            }
          }
        },
          error => {

            console.log(error.error);
            this.error = "Some error occured";
            this.showLoader = false;
          }
        );
      }

    }
  }

  public manageFiles(files: File[]) {
    this.isDragOver = false;
    if (files.some(x => x.size > this._fileSize)) {
      this.error = "File size must be less than 25 MB";
    } else if (files.length > 1) {
      this.error = "We support single file drag and drop only";
    } else {
      this._selectedFiles = files;
      this._uploadFile();
    }
  }

  public dragFile(e) {
    let dt = e.dataTransfer;
    let itemType = dt.items[0].type;
    if (!itemType)
      return false;

    if (dt.types && (dt.types.indexOf ? dt.types.indexOf('Files') != -1 : dt.types.includes('Files'))) {
      this.isDragOver = !this.isDragOver;
    }
  }

  // public downloadFile(fileId: number, fileName: string): void {
  //   this.isLoading = true;
  //   this.newsService.download(fileId, this.newsId)
  //       .subscribe((response: Blob) => {
  //           saveAs(response, fileName);
  //           this.isLoading = false;
  //       },
  //           (errorMessage) => {
  //             this.error = errorMessage.error;
  //               this.isLoading = false;
  //           });
  // }

  public changeActiveEditor(activeEditor: string) {
    this.activeEditor = activeEditor;
  }

  public getFileDetails(event): void {
    for (let i = 0; i < event.target.files.length; i++) {
      let file = event.target.files[i];
      //TODO: delete this if statement, replace to multiple file add
      if (this._selectedFiles != undefined && this._selectedFiles.length > 0)
        this._selectedFiles.splice(0, this._selectedFiles.length);

      this._selectedFiles.push(file);

      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[i]);

      // called once readAsDataURL is completed
      reader.onload = (event: any) => {
        file.path = event.target.result;
        this._filesURLs.push(file);
      }
    }
    event.target.value = '';
    this._uploadFile();
  }


  private _fillUpFormData(): FormData {
    let formData = new FormData();
    this._selectedFiles.forEach(file => {
      formData.append('formFiles', file);
    });
    formData.append('newsId', this.newsId.toString());

    return formData;
  }

  private _uploadFile(): void {
    this.isLoading = true;
    if (this.isRequestSend == false) {
      this.isRequestSend = true;
      this.newsService.upload(this.newsId, this._fillUpFormData()).subscribe(
        (workItemFiles: Array<NewsFileViewModel>) => {
          this.isLoading = false;
          this._selectedFiles.splice(0, this._selectedFiles.length);
          this._filesURLs.splice(0, this._filesURLs.length);

          workItemFiles.forEach(workItemFile => {
            this.newsItemFiles.push(workItemFile);
          });
          this.isRequestSend = false;
        },
        (errorRequest) => {
          this.isLoading = false;
          this.error = errorRequest.error;
          this.isRequestSend = false;
        });
    }
  }


  saveAndPreview(content) {
    this.previewModalContent = content;
    this.createNews();
  }

  openPreview() {
    // let url = "./news/"+ id;
    // this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.showLoader = false;
    this.modalService.open(this.previewModalContent).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.previewModalContent = null;
  }

  private getDismissReason(reason: any): string {
    // this.router.navigate(['/news']);
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }


  private _fillDescUpFormData(): FormData {
    let formData = new FormData();
    formData.append('formFiles', this._selectedFiles[0]);
    //formData.append('jobId', '597');

    return formData;
  }

  private uploadFile(e, t, a) {
    if (!this.isLoadFiles) {
      this.isLoadFiles = true;

      this._selectedFiles.unshift(e.blob())
      this.newsService.upload(0, this._fillDescUpFormData()).subscribe(
        (descriptionFiles: Array<any>) => {

          this._selectedFiles.splice(0, this._selectedFiles.length);
          descriptionFiles.forEach(descriptionFile => {
            var str = '<img src="data:' + descriptionFile.mimeType + ';base64,' + e.base64() + '"';
            var strToReplace = '<img src="' + descriptionFile.path + '"';
            this._images.push({ "imageUrl": str, "imageToReplace": strToReplace, "activeEditor": this.activeEditor });
          });

          this.isLoadFiles = false;

        },
        (errorMessage) => {
          this.error = errorMessage.error;
          this.isLoadFiles = false;

        });
    }
  }

  isDateValid() {
    this.isValidDate = true;
    this.isValidTime = true;

    if (this.publishedFrom < Date.now()) {
      this.isValidDate = false;
    }
    if (this.hourFrom > 23 || this.hourFrom < 0) {
      this.isValidTime = false;
    }
    if (this.minutesFrom > 59 || this.minutesFrom < 0) {
      this.isValidTime = false;
    }
    if (!this.isValidDate || !this.isValidTime)
      return false;

    return true;
  }

  private _initContentHtmlData(): void {
    this.textOptions['images_upload_handler'] = (e, t, a) => { this.uploadFile(e, t, a); }
  }

  getDateInStringFormat(day: number, month: number, year: number, hour: number, minutes: number): string {
    if (day == undefined || month == undefined || year == undefined) {
      return "";
    }

    var dayStr = "";
    var monthStr = "";
    var yearStr = "";
    var time;
    var hourStr = "";
    var minutesStr = "";

    if (hour == undefined || minutes == undefined) {
      time = "00:00";
    } else {
      var offset = new Date().getTimezoneOffset() / 60;
      hour += offset;
      if (hour < 0) {
        hour += 24;
        day -= 1;
      }
      if (hour < 10) {
        hourStr = "0" + hour;
      } else {
        hourStr = hour.toString();
      }
      if (minutes < 10) {
        minutesStr = "0" + minutes;
      } else {
        minutesStr = minutes.toString();
      }
      time = hourStr + ":" + minutesStr;
    }

    if (day < 10) {
      dayStr = "0" + day;
    } else {
      dayStr = day.toString();
    }

    if (month < 10) {
      monthStr = "0" + month;
    } else {
      monthStr = month.toString();
    }

    return dayStr + "/" + monthStr + "/" + year + " " + time;
  }

  validateTime() {
    if (this.hourFrom < 0) {
      this.hourFrom *= -1;
    }
    if (this.hourFrom > 23) {
      this.hourFrom = this.hourFrom % 10;
    }

    if (this.minutesFrom < 0) {
      this.minutesFrom *= -1;
    }
    if (this.minutesFrom > 59) {
      this.minutesFrom = this.minutesFrom % 10;
    }
  }

  validateTimeTo() {
    if (this.hourTo < 0) {
      this.hourTo *= -1;
    }
    if (this.hourTo > 23) {
      this.hourTo = this.hourTo % 10;
    }

    if (this.minutesTo < 0) {
      this.minutesTo *= -1;
    }
    if (this.minutesTo > 59) {
      this.minutesTo = this.minutesTo % 10;
    }
  }

  formValidation() {
    var isValidFrom = this.categoriesValid && this.isDateValid();
    this.isValidMsgTitle = true;
    this.isValidMsgText = true;
    var controls = this.form.controls;
    if (controls.title.errors != null && controls.title.errors.required) {
      this.isValidMsgTitle = false;
      isValidFrom = false;
    }

    if (controls.contentHtml.errors != null) {
      this.isValidMsgText = false;
      isValidFrom = false;
    }

    return isValidFrom;
  }

  isPublishedSelected(event) {
    if (this.isPublish) {
      this.news.level = "Published";
    } else {
      this.news.level = "Draft";
    }
  }

  showPublish() {
    if (this.form.get('selectPublish').value == 2) {
      var hourNow = new Date().getHours();
      var minutesNow = new Date().getMinutes();
      this.minutesFrom = minutesNow;
      this.hourFrom = hourNow;
      this.isShowPublishFrom = true;
    }
    else
      this.isShowPublishFrom = false;
  }

  closeButton() {
    this.router.navigate(['/news']);
  }
}
