import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { HttpClientService } from 'app/shared/http-client/http-client.service';
import { AuthService } from 'app/auth/auth.service';
import { WellnessCategoryModel } from 'app/models/wellness-room/wellnessCategory.model';
import { ListItemsModel } from 'app/models/abstract/listItemsModel';
import { CategoryFilter } from 'app/models/wellness-room/wellnessFilter';

@Injectable({ providedIn: 'root' })
export class WellnessCategoryService {
  myHeaders: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json;");

  constructor(private http: HttpClient, private router: Router, private _authService: AuthService) { }

  getWellnessCategoriesByFilter(filter: CategoryFilter) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.get<ListItemsModel>(HttpClientService.WELLNESS_CATEGORY_CONTROLLER, { headers: this.myHeaders , params: {
      pageNumber: String(filter.pageNumber),
      take: String(filter.take)
    } })
      .pipe(tap(resData => {
      }));
  }

  createCategory(data: WellnessCategoryModel) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.post(HttpClientService.CREATE_WELLNESS_CATEGORY, data, { headers: this.myHeaders })
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

    return this.http.get<WellnessCategoryModel>(HttpClientService.WELLNESS_CATEGORY_CONTROLLER.concat("/", id.toString()), { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

  editCategory(data: WellnessCategoryModel) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.put(HttpClientService.WELLNESS_CATEGORY_CONTROLLER, data, { headers: this.myHeaders})
      .pipe(tap(resData => {
      }));
  }

  deleteCategory(id: number) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.delete(HttpClientService.WELLNESS_CATEGORY_CONTROLLER.concat("/", id.toString()), { headers: this.myHeaders })
      .pipe(tap(resData => {
        this.router.navigate(['/wellnessroom/category']);
      }));
  }

  upload(id: number, formData: any) {
    this.myHeaders = new HttpHeaders();
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.post(`${HttpClientService.WELLNESS_CATEGORY_UPLOAD}/${id}`, formData, { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }
}
