import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { CategoryModel } from 'app/models/category/categories.model';
import { catchError, tap } from 'rxjs/operators';
import { HttpClientService } from 'app/shared/http-client/http-client.service';
import { CategoriesSearchFilter } from 'app/models/category/categoriesSearchFilter';
import { ListItemsModel } from 'app/models/abstract/listItemsModel';
import { AuthService } from 'app/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  myHeaders: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json;");

  constructor(private http: HttpClient, private router: Router, private _authService: AuthService) {
  }

  getCategories() {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
        let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
        this.myHeaders = this.myHeaders.append('Authorization', token);
        this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
        this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.get<CategoryModel[]>(HttpClientService.CATEGORIES_CONTROLLER, { headers: this.myHeaders})
      .pipe(tap(resData => {
      }));
  }

  getCategoriesByFilter(filter: CategoriesSearchFilter) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
        this.myHeaders = this.myHeaders.append('Authorization', token);
        this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
        this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.get<ListItemsModel>(HttpClientService.CATEGORIES_GET_BY_FILTER_CONTROLLER, { headers: this.myHeaders, params: {
      searchKeyWordByName : filter.searchKeyWordByName,
      pageNumber: String(filter.pageNumber),
      take: String(filter.take),
      orderType:  String(filter.orderType)
    }})
      .pipe(tap(resData => {
      }));
  }

  getCategoriesListForDropDown() {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
               let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
        this.myHeaders = this.myHeaders.append('Authorization', token);
        this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
        this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.get<CategoryModel[]>(HttpClientService.CATEGORIES_DROPDOWNLIST_CONTROLLER, { headers: this.myHeaders})
      .pipe(tap(resData => {
      }));
  }

  getCategoryById(id: number) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
        let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
        this.myHeaders = this.myHeaders.append('Authorization', token);
        this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
        this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.get<CategoryModel>(HttpClientService.CATEGORIES_CONTROLLER.concat("/", id.toString()), { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

  createCategory(data: CategoryModel) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.post(HttpClientService.CATEGORIES_CONTROLLER, data, { headers: this.myHeaders})
      .pipe(tap(resData => {
        this.router.navigate(['/categories']);
      }));
  }


  editCategory(data: CategoryModel) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.put(HttpClientService.CATEGORIES_CONTROLLER, data, { headers: this.myHeaders})
      .pipe(tap(resData => {
        this.router.navigate(['/categories']);
      }));
  }


  deleteCategory(id: number) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.delete(HttpClientService.CATEGORIES_CONTROLLER.concat("/", id.toString()), { headers: this.myHeaders })
      .pipe(tap(resData => {
        this.router.navigate(['/categories']);
      }));
  }

}
