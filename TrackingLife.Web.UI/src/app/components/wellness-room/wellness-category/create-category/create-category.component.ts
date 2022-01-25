import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { FileViewModel } from "app/models/news/file-view-model.model";
import { WellnessCategoryModel } from "app/models/wellness-room/wellnessCategory.model";
import { ToastService } from "app/services/toast.service";
import { WellnessCategoryService } from "app/services/wellness-room/wellnessCategory.service";
import { CategoryForm } from "./CategoryForm";

@Component({
  selector: "app-create-category",
  templateUrl: "./create-category.component.html",
  styleUrls: ["./create-category.component.css"],
})
export class CreateCategoryComponent implements OnInit {
  public isLoadFiles: boolean = false;
  public error: string;
  public category: WellnessCategoryModel;
  public isLoading: boolean = false;
  public form: FormGroup = new CategoryForm().AddCategoryForm;
  showLoader: boolean = false;
  categoriesValid = true;
  isValidMsgTitle: boolean = true;
  isCoverExist: boolean;
  @Output() uploadImage = new EventEmitter<any>();
  @Output() deleteImage = new EventEmitter();
  @Output() croppedImage = new EventEmitter<any>();
  @Input() categoryId: number;
  @Input() formData: any;
  constructor(
    private router: Router,
    private wellnessCategoryService: WellnessCategoryService,
    private toastService: ToastService) 
    { this.category = new WellnessCategoryModel();}

  ngOnInit() {}

  createCategory(): void {
    var isValidForm = this.formValidation();
    if (this.form.value && isValidForm) {
      this.showLoader = true;
      let sendingObj = { ...this.form.value };

        this.wellnessCategoryService.createCategory({ ...sendingObj, categoryId: this.categoryId }).subscribe((respData) => {
          this.isLoading = false;
          this.category = new WellnessCategoryModel(respData);

          if (this.formData) {
            this.wellnessCategoryService.upload(this.category.id, this.formData).subscribe((data) => {
              var model = new FileViewModel(data);
              this.category.bannerImageUrl = model.imageUrl;
              this.toastService.showSuccess('Changed');
              this.router.navigate(["/wellnessroom/category"]);
            });
          } else {
            this.router.navigate(["/wellnessroom/category"]);
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
    this.router.navigate(["/wellnessroom/category"]);
  }
}
