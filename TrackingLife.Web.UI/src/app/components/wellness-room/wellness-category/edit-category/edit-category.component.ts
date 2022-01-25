import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { WellnessCategoryModel } from "app/models/wellness-room/wellnessCategory.model";
import { ToastService } from "app/services/toast.service";
import { WellnessCategoryService } from "app/services/wellness-room/wellnessCategory.service";
import { Subscription } from "rxjs-compat";

@Component({
  selector: "app-edit-category",
  templateUrl: "./edit-category.component.html",
  styleUrls: ["./edit-category.component.css"],
})
export class EditCategoryComponent implements OnInit {
  public category: WellnessCategoryModel;
  private sub: Subscription;
  public error: string;
  public categoriesValid = true;
  public isNewBannerImageSelected: boolean = false;
  public isTitleValid = true;
  isCoverExist: boolean;
  showLoader = false;
  
  @Input() formData: any;
  @Output() deleteImage = new EventEmitter();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private wellnessCategoryService: WellnessCategoryService
  ) { this.category = new WellnessCategoryModel();}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      var id = params["id"];
      if (id) {
        this.getCategory(id);
      } else {
        this.router.navigate(['/not-found']);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  croppedCover(image): void {
    this.isCoverExist = true;
  }

  deleteCover(): void {
    this.formData = null;
    this.category.bannerImageUrl = null;
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
  getCategory(id: number) {
   this.wellnessCategoryService.getCategoryById(id).subscribe(
      (respData) => {
        this.category = new WellnessCategoryModel(respData);
        if (this.category.bannerImageUrl) {
          this.isCoverExist = true;
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


  editCategory() {
    if (this.formData) {
      this.wellnessCategoryService.upload(this.category.id, this.formData).subscribe((data) => {
        this.formData = data;
        this.toastService.showSuccess('Changed');
      });
    }

    if (this.isFormValid()) {
      this.showLoader = true;
      this.wellnessCategoryService.editCategory(this.category).subscribe(respData => {
        this.toastService.showSuccess("Category was edited successfully");
        this.router.navigate(['/wellnessroom/category']);
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

    if (this.category.title.length == 0) {
      isValidFrom = false;
      this.isTitleValid = false;
    }

    return isValidFrom;
  }

  closeButton() {
    this.router.navigate(["/wellnessroom/category"]);
  }
}
