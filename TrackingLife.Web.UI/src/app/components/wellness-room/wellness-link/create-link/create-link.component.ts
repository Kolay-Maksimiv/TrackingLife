import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output, SecurityContext } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkType } from 'app/enums/LinkType';
import { FileViewModel } from 'app/models/news/file-view-model.model';
import { WellnessLinkModel } from 'app/models/wellness-room/wellnessLink.model';
import { ToastService } from 'app/services/toast.service';
import { WellnessLinkService } from 'app/services/wellness-room/wellnessLink.service';
import { LinkForm } from './LinkForm';

@Component({
  selector: 'app-create-link',
  templateUrl: './create-link.component.html',
  styleUrls: ['./create-link.component.css']
})
export class CreateLinkComponent implements OnInit {
  public isLoadFiles: boolean = false;
  public error: string;
  public link: WellnessLinkModel;
  public isLoading: boolean = false;
  public form: FormGroup = new LinkForm().AddLinkForm;
  public categoryId : number;
  public linkType: LinkType;
  public isTitleValid = true;
  public isLinkValid = true;
  public isPdfFile: boolean = false;
  public isYouTube: boolean = false;
  public url: string;
  fileToUpload:File = null;
  urlSafe: SafeResourceUrl;
  showLoader: boolean = false;
  categoriesValid = true;
  isValidMsgTitle: boolean = true;
  isCoverExist: boolean;


  @Output() uploadImage = new EventEmitter<any>();
  @Output() deleteImage = new EventEmitter();
  @Output() croppedImage = new EventEmitter<any>();
  @Input() linkId: number;
  @Input() formData: any;
 

  constructor(
    private router: Router,
    private wellnessLinkService: WellnessLinkService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private toastService: ToastService)
     {  this.link = new WellnessLinkModel();
        this.linkType = LinkType.WebSite;
     }

  ngOnInit() {
    this.categoryId = this.route.snapshot.params.id;
    this.url = 'https://youtu.be/qsOUv9EzKsg';
    console.log(this.url)
    var videoId = this.getId(this.url)
    this.url = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=https://www.youtube.com`;
 
    console.log('id', this.getId(this.url));
 
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }


  getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
 
    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}

  newTypeLinkSelected(event) {
    this.linkType = Number(event.target.value);

    if(this.linkType == LinkType.PDFfile) {
      this.isPdfFile = true;
    } else {
      this.isPdfFile = false;
    }

    // if(this.linkType == LinkType.YouTubeVideo) {
    //   this.isYouTube = true;

    // } else {
    //   this.isYouTube = false;
    // }
  }

  createLink(): void {
    var isValidForm = this.formValidation();
    if (this.form.value && isValidForm) {
      this.showLoader = true;

      if(this.link.linkType == null)
      {
        this.link.linkType = this.linkType;
      }

      let sendingObj = { ...this.form.value };
      sendingObj["linkType"] = this.linkType;

      this.wellnessLinkService.createLink({ ...sendingObj }, this.categoryId).subscribe((respData) => {
          this.isLoading = false;
          this.link = new WellnessLinkModel(respData);
          if (this.formData) {
            this.wellnessLinkService.upload(this.link.id, this.formData).subscribe((data) => {
                var model = new FileViewModel(data);
                this.link.bannerImageUrl = model.imageUrl;
                this.toastService.showSuccess('Changed');
                this.router.navigate(['/wellnessroom/category', this.categoryId, 'link']);
              });
          } else {
            this.router.navigate(['/wellnessroom/category', this.categoryId, 'link']);
          }
        }),
          error => {
            console.log(error.error);
            this.error = "Some error occured";
            this.showLoader = false;
          };
    }
  }
 
  croppedCover(image): void {
    this.formData = image;
    this.isCoverExist = true;
  }

  uploadCover(formData): void {
    this.formData = formData;
  }

  isFormValid() {
    var isValidFrom = this.categoriesValid;
    this.isTitleValid = true;
    this.isLinkValid = true;

    if (this.link.title.length == 0) {
      isValidFrom = false;
      this.isTitleValid = false;
    }

    if (this.link.title.length == 0) {
      isValidFrom = false;
      this.isLinkValid = false;
    }

    return isValidFrom;
  }

  formValidation() {
    var isValidFrom = this.categoriesValid;
    this.isValidMsgTitle = true;
    var controls = this.form.controls;
    if (controls.title.errors != null && controls.title.errors.required) {
      this.isValidMsgTitle = false;
      isValidFrom = false;
    }

    return isValidFrom;
  }

  closeButton() {
    this.router.navigate(['/wellnessroom/category', this.categoryId, 'link']);
  }

  onFileSelected(event) {
    this.fileToUpload = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name)
    this.wellnessLinkService.uploadFile(formData).subscribe(res =>{
      var model = new FileViewModel(res);
      this.link.link = model.fileUrl;
    })
  }
}
