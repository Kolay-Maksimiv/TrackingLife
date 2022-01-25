import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryModel } from 'app/models/category/categories.model';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  error: string = null;

  constructor(private categoryService: CategoryService,
     public authService: AuthService) { }

  ngOnInit() {
  }

  createCategory(form: NgForm) {
      if (form.valid) {

         const model = new CategoryModel(form.value);
         this.categoryService.createCategory(model).subscribe(respData => {
         },
         error => {
             console.log(error.error);
             this.error = "Some error occured";
         }
         );
      }
  }
}
