import { CategoryService } from '../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'app/models/category/categories.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import Swal from 'sweetalert2';
import { ToastService } from 'app/services/toast.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { CategoryOrderType } from 'app/enums/categoryOrderType';
import { CategoriesSearchFilter } from 'app/models/category/categoriesSearchFilter';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  isLoading: boolean = false;
  error: string = null;
  categories: CategoryModel[] = [];
  filteredCategories: CategoryModel[] = [];
  filteredAndSortedCategories: CategoryModel[] = [];
  //search and pagination
  searchByName = new FormControl("");
  orderBy: CategoryOrderType;
  filter: CategoriesSearchFilter;

  public page:number = 1;
  public previousPage: number;
  public itemsPerPage:number = 10;
  public numPages:number = 1;
  public length:number = 0;
//end search and pagination
 constructor(private http: HttpClient,
            private categoryService: CategoryService,
            private toastService: ToastService,
            private router: Router) {
              this.orderBy = CategoryOrderType.Id;
              this.filter = new CategoriesSearchFilter(1, this.itemsPerPage, CategoryOrderType.Id, '');
             }

 ngOnInit() {
  this.isLoading = true;
  this.getCategories();

  this.search(this.searchByName.valueChanges);
 }

 getCategories(){
  this.categoryService.getCategoriesByFilter(this.filter).subscribe(respData => {
    this.categories = respData.items;
    this.length = respData.counts;
    this.isLoading = false;
  },
  error => {
    if (error.error) {
      this.toastService.showError(error.error);
      } else {
        this.toastService.showError("Some error occured");
      }
      this.isLoading = false;
  }
    );
 }

 search(terms: Observable<string | boolean>) {
   this.isLoading = true;

    terms.debounceTime(500)
      .distinctUntilChanged()
      .subscribe(() => {
        this.filter.searchKeyWordByName =  this.searchByName.value;
        this.getCategories();
      });
}

 createCategoryRedirect() {
  this.router.navigate(['/categories/add']);
 }

deleteCategory(category: CategoryModel) {
  Swal.fire({
    title: 'Are you sure you want to delete this Category?',
    text: 'You will not be able to undo this action!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ok',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
        this.categoryService.deleteCategory(category.id).subscribe(respData => {
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

//search
sortItems(column: string){
  this.isLoading = true;

  switch (column.toLowerCase()) {
    case "id":
        this.orderBy = this.orderBy == CategoryOrderType.Id ? CategoryOrderType.IdDesc : CategoryOrderType.Id;
        break;
    case "name":
       this.orderBy = this.orderBy == CategoryOrderType.Name ? CategoryOrderType.NameDesc : CategoryOrderType.Name;
       break;
}
this.filter.orderType = this.orderBy;
this.getCategories();
}

loadPage(page: number) {
  if (page !== this.previousPage) {
    this.previousPage = page;
    this.filter.pageNumber = page;
    this.getCategories();
  }
//end search
}
}
