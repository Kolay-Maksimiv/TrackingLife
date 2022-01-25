import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkType } from 'app/enums/LinkType';
import { FileViewModel } from 'app/models/news/file-view-model.model';
import { WellnessLinkModel } from 'app/models/wellness-room/wellnessLink.model';
import { ToastService } from 'app/services/toast.service';
import { WellnessLinkService } from 'app/services/wellness-room/wellnessLink.service';
import { Subscription } from 'rxjs-compat';

@Component({
  selector: 'app-edit-link',
  templateUrl: './edit-link.component.html',
  styleUrls: ['./edit-link.component.css']
})
export class EditLinkComponent implements OnInit {

  public link: WellnessLinkModel = new WellnessLinkModel();;
  private sub: Subscription;
  public error: string;
  public categoriesValid = true;
  public isNewBannerImageSelected: boolean = false;
  public isTitleValid = true;
  public isLinkValid = true;
  public categoryId : number;
  public linkType: LinkType;
  fileToUpload:File = null;
  public isPdfFile: boolean = false;
  public isYouTube: boolean = false;
  isCoverExist: boolean;
  showLoader = false;

  url: string = "https://youtu.be/NdbTCCELnn0";
  urlSafe: SafeResourceUrl;
  
  @Input() formData: any;
  @Output() deleteImage = new EventEmitter();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    public sanitizer: DomSanitizer,
    private wellnessLinkService: WellnessLinkService
  ) {  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.params.id;

    if(this.linkType == LinkType.YouTubeVideo)
    {
      this.isYouTube = true;
    }

    this.sub = this.route.params.subscribe((params) => {
      var categoryId = params["id"];
      var linkId = params["linkId"];
      
      if (linkId && categoryId ) {
        this.getLink(linkId);
      } else {
        this.router.navigate(['/not-found']);
      }
    });

    // this.url = "https://youtu.be/Kkgu4lgv3HM";
    // var videoId = this.getId(this.url)
    // this.url = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=https://www.youtube.com`;
 
    // console.log('id', this.getId(this.url));
 
    // this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  // getId(url) {
  //   var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  //   var match = url.match(regExp);
 
  //   if (match && match[2].length == 11) {
  //       return match[2];
  //   } else {
  //       return 'error';
  //   }
  // }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  croppedCover(image): void {
    this.isCoverExist = true;
  }

  deleteCover(): void {
    this.formData = null;
    this.link.bannerImageUrl = null;
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
  getLink(id: number) {
   this.wellnessLinkService.getLinkById(id).subscribe(
      (respData) => {
        this.link = new WellnessLinkModel(respData);
        if (this.link.bannerImageUrl) {
          this.isCoverExist = true;
        }

        if(this.link.linkType == LinkType.PDFfile) {
          this.isPdfFile = true;
        }
      },
      (error) => {
        if (error.error) {
          this.error = error.error;
        } else {
          this.error = "Some error occured";
        }
        this.router.navigate(["/not-found"]);
      }
    );
  }

  public newBannerImageSelected(data: any) {
    this.isNewBannerImageSelected = data;
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

  editLink() {
    
    if(this.linkType != null)
    {
      this.link.linkType = this.linkType;
    }
    
    if (this.formData) {
      this.wellnessLinkService.upload(this.link.id, this.formData).subscribe((data) => {
        this.formData = data;
        this.toastService.showSuccess('Changed');
      });
    }

    if (this.isFormValid()) {
      this.showLoader = true;
      this.wellnessLinkService.editLink(this.link).subscribe(respData => {
        this.toastService.showSuccess("Link was edited successfully");
        this.router.navigate(['/wellnessroom/category', this.categoryId, 'link']);
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

  isFormValid() {
    var isValidFrom = this.categoriesValid;
    this.isTitleValid = true;
    this.isLinkValid = true;

    if (this.link.title.length == 0) {
      isValidFrom = false;
      this.isTitleValid = false;
    }

    if (this.link.link.length == 0) {
      isValidFrom = false;
      this.isLinkValid = false;
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
