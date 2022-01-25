import { CategoryService } from './../../services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryModel } from 'app/models/category/categories.model';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'app/auth/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  error: string = null;
  category: CategoryModel;

  constructor(public categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
     public authService: AuthService) {
       this.category = new CategoryModel();
     }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      var id = params['id'];
      if (id) {
        this.getCategory(id);
      } else {
        this.router.navigate(['/home']);
      }
   });

  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  getCategory(id: number){
    var category = this.categoryService.getCategoryById(id).subscribe(
      respData => {
        this.category = new CategoryModel(respData);
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

  editCategory() {
   if (this.category.name) {

    this.categoryService.editCategory(this.category).subscribe(respData => {
          //this.router.navigate(['/home']);
       },
       error => {
            if (error.error) {
              this.error = error.error;
          } else {
            this.error = "Some error occured";
          }
       }
       );
    }
  }
}
