import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { NewsService } from 'app/services/news.service';
import { NewsModel } from 'app/models/news/news.model';
import { CategoryModel } from 'app/models/category/categories.model';
import { CategoryService } from 'app/services/category.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastService } from 'app/services/toast.service';
import { TextEditorOptions } from 'app/core/editor.options';
import { NgbModal, ModalDismissReasons, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NewsFileViewModel } from 'app/models/news/NewsFileViewModel.model';
import { FileViewModel } from 'app/models/news/file-view-model.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewsEditComponent implements OnInit {
  closeResult: string;
  url: string = "";//"./news/edit/1";//"https://angular.io/api/router/RouterLink";
  urlSafe: SafeResourceUrl;
  newsId: number;
  @Input() formData: any;
  @Output() deleteImage = new EventEmitter();

  private sub: Subscription;
  isCoverExist: boolean;

  error: string = null;
  news: NewsModel;
  categoriesList: CategoryModel[];
  //fileToUpload: File = null;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  public textOptions: Object = new TextEditorOptions().options;
  public activeEditor: string;
  public newsItemFiles: Array<NewsFileViewModel> = [];
  public isLoadFiles: boolean = false;
  public isLoading: boolean = false;
  public isRequestSend: boolean = false;
  public isDragOver: boolean = false;
  public isNewBannerImageSelected: boolean = false;
  private _selectedFiles: any[] = [];
  private _filesURLs: any[] = [];
  private _images: object[] = [];
  private _fileSize = 25 * 1024 * 1024;
  public categoriesValid = true;
  public isTitleValid = true;
  public isTextValid = true;
  showLoader = false;
  isPublish: boolean;
  publishedFrom = { year: 2020, month: 1, day: 1 };
  publishedTo = { year: 2020, month: 1, day: 1 };
  hourFrom: number;
  hourTo: number;
  minutesFrom: number;
  minutesTo: number;
  isValidDate = true;
  isValidTime = true;
  minDate = undefined;
  minDateTo = undefined;
  isShowPublishFrom: boolean = false;
  publishedToStart = { year: 2020, month: 11, day: 8 };

  editorOptions = {};

  constructor(public newsService: NewsService,
    private categoryService: CategoryService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private modalService: NgbModal,
    public sanitizer: DomSanitizer) {
    this.news = new NewsModel();
    this.categoriesList = [];
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      var id = params['id'];
      if (id) {
        this.getNews(id);
        this.getCategories();
      } else {
        this.router.navigate(['/not-found']);
      }
      this.newsId = id;
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    let url = "./news/" + this.newsId;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);

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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  croppedCover(image): void {
    this.isCoverExist = true;
  }

  deleteCover(): void {
    this.formData = null;
    this.news.bannerImageUrl = null;
    this.news.thumbnailImageUrl = null;
    this.deleteImage.emit();

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
    this.toastService.showInfo("Deleted");
  }

  uploadCover(formData): void {
    this.formData = formData;
    // this.companyService.uploadCover(formData, this.companyId).subscribe((data) => {
    //     this.company.coverUrl = data;
    //     this.alertService.showMessage(this.gT('companies.CoverChanged'));
    //   });
  }


  getNews(id: number) {
    this.newsService.getEditNewsById(id).subscribe(
      respData => {
        this.news = new NewsModel(respData);
        if (this.news.level == "Published") {
          this.isPublish = true;
        }
        this.setSelectPublish();
        if (this.news.thumbnailImageUrl) {
          this.isCoverExist = true;
        }
        if (respData.categoryList) {
          this.selectedItems = respData.categoryList.map(x => { return { 'item_id': x.id, 'item_text': x.name } });
        }
      },
      error => {
        if (error.error) {
          this.error = error.error;
        } else {
          this.error = "Some error occured";
        }
        this.router.navigate(['/not-found']);
      }
    );
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

  editNews() {
    if (this.news.level == 'Published') {
      if (this.isPublish || (this.isPublish == undefined && this.news.level == "Published"))
        this.news.level = "Published";
      else
        this.news.level = "Draft";
    } else {
      if (this.news.selectPublish == 1)
        this.news.level = "Published";
      else
        this.news.level = "Draft";
    }

    // if (this.publishedFrom && this.news.selectPublish == 2) {
    //   this.news.publishedFromStr = this.getDateInStringFormat(this.publishedFrom.day, this.publishedFrom.month, this.publishedFrom.year, this.hourFrom, this.minutesFrom);
    // } else if (this.news.selectPublish == 1)
    //   this.news.publishedFromStr = "";

    // if (this.publishedTo && this.news.selectPublish == 2) {
    //   this.news.publishedToStr = this.getDateInStringFormat(this.publishedTo.day, this.publishedTo.month, this.publishedTo.year, this.hourTo, this.minutesTo);
    // } else if (this.news.selectPublish == 1)
    //   this.news.publishedToStr = this.getDateInStringFormat(this.publishedTo.day, this.publishedTo.month, this.publishedTo.year, undefined, undefined);

    var selectedCategoriesIds = this.selectedItems.map(x => { return x.item_id });
    this.news.categoryList = this.categoriesList.filter(x => selectedCategoriesIds.includes(x.id));
    this.categoriesValid = this.categoriesList.filter(x => selectedCategoriesIds.includes(x.id)).length > 0;
    if (this.formData) {
      this.newsService.upload(this.news.id, this.formData).subscribe((data) => {
        this.formData = data;
        this.toastService.showSuccess('Changed');
      });
    }

    if (this.isFormValid()) {
      this.showLoader = true;
      this.newsService.edit(this.news).subscribe(respData => {
        this.toastService.showSuccess("News was edited successfully");
        this.router.navigate(['/news']);
      },
        error => {
          if (error.error) {
            this.toastService.showError(error.error);
          } else {
            this.toastService.showError("Some error occured");
          }
          this.showLoader = false;
        }
      );
    }
  }

  closeButton() {
    this.router.navigate(['/news']);
  }

  open(content) {
    if (this.news.level == 'Published') {
      if (this.isPublish || (this.isPublish == undefined && this.news.level == "Published"))
        this.news.level = "Published";
      else
        this.news.level = "Draft";
    } else {
      if (this.news.selectPublish == 1)
        this.news.level = "Published";
      else
        this.news.level = "Draft";
    }

    if (this.publishedFrom && this.news.selectPublish == 2) {
      this.news.publishedFromStr = this.getDateInStringFormat(this.publishedFrom.day, this.publishedFrom.month, this.publishedFrom.year, this.hourFrom, this.minutesFrom);
    } else if (this.news.selectPublish == 1)
      this.news.publishedFromStr = "";

    if (this.publishedTo && this.news.selectPublish == 2) {
      this.news.publishedToStr = this.getDateInStringFormat(this.publishedTo.day, this.publishedTo.month, this.publishedTo.year, this.hourTo, this.minutesTo);
    } else if (this.news.selectPublish == 1)
      this.news.publishedToStr = "";

    var selectedCategoriesIds = this.selectedItems.map(x => { return x.item_id });
    this.news.categoryList = this.categoriesList.filter(x => selectedCategoriesIds.includes(x.id));
    this.showLoader = true;
    var selectPublish = this.news.selectPublish;
    this.newsService.edit(this.news).subscribe(respData => {
      if (this.formData) {
        this.news = new NewsModel(respData);
        this.newsService.upload(this.news.id, this.formData).subscribe(respData => {

          var model = new FileViewModel(respData);
          this.news.bannerImageUrl = model.imageUrl;

          this.showLoader = false;
          this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
        });
      } else {
        var model = new FileViewModel(respData);
        this.news = new NewsModel(respData);
        this.showLoader = false;
        this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
      this.news.selectPublish = selectPublish;
    },
      error => {
        if (error.error) {
          this.toastService.showError(error.error);
        } else {
          this.toastService.showError("Some error occured");
        }
        this.showLoader = false;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public changeActiveEditor(activeEditor: string) {
    this.activeEditor = activeEditor;
    this.isFormValid();
  }

  public manageFiles(files: File[]) {
    this.isDragOver = false;
    if (files.some(x => x.size > this._fileSize)) {
      this.error = "File size must be less than 25 MB";
    } else if (files.length > 1) {
      this.error = "We support single file drag and drop only";
    } else {
      this._selectedFiles = files;
      //this._uploadFile();
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

  public newBannerImageSelected(data: any) {
    this.isNewBannerImageSelected = data;
  }

  public downloadFile(fileId: number, fileName: string): void {
    // this.isFileUploaded = true;
    // this.newsService.download(fileId, this.newsId)
    //     .subscribe((response: Blob) => {
    //         saveAs(response, fileName);
    //         this.isFileUploaded = false;
    //     },
    //         (errorMessage) => {
    //           this.error = errorMessage.error;
    //             this.isFileUploaded = false;
    //         });
  }

  isFormValid() {
    var isValidFrom = this.categoriesValid;
    this.isTitleValid = true;
    this.isTextValid = true;

    if (this.news.title.length == 0) {
      isValidFrom = false;
      this.isTitleValid = false;
    }

    if (this.news.contentHtml.length == 0) {
      isValidFrom = false;
      this.isTextValid = false;
    }

    return isValidFrom;
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
  showPublish() {
    if (this.news.selectPublish == 2) {
      var offset = new Date().getTimezoneOffset() / 60;
      if (this.news.publishedFrom != null) {
        this.publishedFrom = new NgbDate(
          new Date(this.news.publishedFrom).getFullYear(),
          new Date(this.news.publishedFrom).getMonth() + 1,
          new Date(this.news.publishedFrom).getDate());

        this.minutesFrom = new Date(this.news.publishedFrom).getMinutes();
        this.hourFrom = new Date(this.news.publishedFrom).getHours() - offset;

        if (this.hourFrom >= 24) {
          this.hourFrom -= 24;
          this.publishedFrom.day -= 1;
        }

        this.minDate = {
          year: this.publishedFrom.year,
          month: this.publishedFrom.month,
          day: this.publishedFrom.day
        };
      } else {
        var hourNow = new Date().getHours();
        var minutesNow = new Date().getMinutes();
        this.minutesFrom = minutesNow;
        this.hourFrom = hourNow;
        this.publishedFrom = new NgbDate(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          new Date().getDate());

        this.minDate = {
          year: this.publishedFrom.year,
          month: this.publishedFrom.month,
          day: this.publishedFrom.day
        };
      }

      if (this.news.publishedTo != null) {
        this.publishedTo = new NgbDate(
          new Date(this.news.publishedTo).getFullYear(),
          new Date(this.news.publishedTo).getMonth() + 1,
          new Date(this.news.publishedTo).getDate());

        this.minutesTo = new Date(this.news.publishedTo).getMinutes();
        this.hourTo = new Date(this.news.publishedTo).getHours() - offset;

        if (this.hourTo >= 24) {
          this.hourTo -= 24;
          this.publishedTo.day -= 1;
        }
      } else {
        this.publishedTo = undefined;
      }

      this.minDateTo = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate()
      };

      this.isShowPublishFrom = true;
    }
    else
      this.isShowPublishFrom = false;
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

  setSelectPublish() {
    this.news.selectPublish = this.news.publishedFrom != null && this.news.level == 'Draft' ? 2 : 0;
    this.showPublish();
  }

  isPublishedSelected(event) {
    if (this.isPublish) {
      this.news.level = "Published";
    } else {
      this.news.level = "Draft";
    }
  }

}
