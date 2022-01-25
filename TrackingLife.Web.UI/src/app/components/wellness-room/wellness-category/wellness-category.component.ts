import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WellnessCategoryModel } from 'app/models/wellness-room/wellnessCategory.model';
import { CategoryFilter } from 'app/models/wellness-room/wellnessFilter';
import { ToastService } from 'app/services/toast.service';
import { WellnessCategoryService } from 'app/services/wellness-room/wellnessCategory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wellness-category',
  templateUrl: './wellness-category.component.html',
  styleUrls: ['./wellness-category.component.css']
})
export class WellnessCategoryComponent implements OnInit {

  categories: WellnessCategoryModel[] = [];
  isLoading: boolean = false;
  filteredCategories: WellnessCategoryModel[] = [];
  filter: CategoryFilter;
  public page: number = 1;
  public previousPage: number;
  public itemsPerPage: number = 10;
  public numPages: number = 1;
  public length: number = 0;

  constructor(private router: Router,
    private wellnessCategoryService : WellnessCategoryService,
    private toastService: ToastService) {
      this.filter = new CategoryFilter(1, this.itemsPerPage);
     }

  ngOnInit() {
    this.getCategories();
  }

  createWellnessCategory() {
    this.router.navigate(['/wellnessroom/category/create']);
  }

  getCategories() {
    this.wellnessCategoryService.getWellnessCategoriesByFilter(this.filter).subscribe(respData => {
      this.categories = respData.items;
      this.length = respData.counts;
      this.isLoading = false;
    })
  }

  initFilter() {
    this.filter.pageNumber = this.page;
    this.filter.take = this.itemsPerPage;
    this.getCategories();
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.page = page;
      //   this.filter.pageNumber = page;
      this.initFilter();
    }
  }

  deleteCategory(category: WellnessCategoryModel) {
    Swal.fire({
      title: 'Are you sure you want to delete this Category?',
      html: '<div style="color: red; font-size: 18px;"> Warning! All links in this category will be deleted!</div>  You will not be able to undo this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
          this.wellnessCategoryService.deleteCategory(category.id).subscribe(respData => {
            Swal.fire(
              'Deleted!',
              'Category has been deleted.',
              'success'
            ).then(res => {
              if (res.value) {
                this.categories = this.categories.filter(x => x.id !== category.id);
                this.filteredCategories = this.filteredCategories.filter(x => x.id !== category.id);
  
              }
            });
          },
          error => {
            if (error.error) {
              this.toastService.showError(error.error);
              } else {
                this.toastService.showError("Some error occured");
              }
            }
          );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelled',
          '',
          'error'
        )
      }
    }
    )
  }
}
