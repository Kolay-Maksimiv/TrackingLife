import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientService } from 'app/shared/http-client/http-client.service';
import { AuthService } from 'app/auth/auth.service';
import { WellnessLinkModel } from 'app/models/wellness-room/wellnessLink.model';
import { tap } from 'rxjs/operators';
import { LinkFilter } from 'app/models/wellness-room/wellnessFilter';
import { ListItemsModel } from 'app/models/abstract/listItemsModel';

@Injectable({ providedIn: 'root' })
export class WellnessLinkService {
  myHeaders: HttpHeaders = new HttpHeaders().set("Content-Type", "application/json;");

  constructor(private http: HttpClient, private router: Router, private _authService: AuthService) { }

  getWellnessLinkByFilter( filter: LinkFilter ) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.get<ListItemsModel>(HttpClientService.GET_WELLNESS_LINK, { headers: this.myHeaders , params: {
      pageNumber: String(filter.pageNumber),
      take: String(filter.take),
      categoryId: String(filter.categoryId)
    } })
      .pipe(tap(resData => {
      }));
  }

  createLink(data: WellnessLinkModel, id: number) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.post(HttpClientService.CREATE_WELLNESS_LINK.concat("/", id.toString()), data, { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

  getLinkById(id: number) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
        let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
        this.myHeaders = this.myHeaders.append('Authorization', token);
        this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
        this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.get<WellnessLinkModel>(HttpClientService.WELLNESS_LINK_CONTROLLER.concat("/", id.toString()), { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

  editLink(data: WellnessLinkModel) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.put(HttpClientService.WELLNESS_LINK_CONTROLLER, data, { headers: this.myHeaders})
      .pipe(tap(resData => {
      }));
  }

  deleteLink(id: number) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.delete(HttpClientService.WELLNESS_LINK_CONTROLLER.concat("/", id.toString()), { headers: this.myHeaders })
      .pipe(tap(resData => {
        this.router.navigate(['/wellnessroom/category', id, 'link']);
      }));
  }

  upload(id: number, formData: any) {
    this.myHeaders = new HttpHeaders();
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.post(`${HttpClientService.WELLNESS_LINK_UPLOAD}/${id}`, formData, { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

  uploadFile(formData: any) {
    this.myHeaders = new HttpHeaders();
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.post(HttpClientService.WELLNESS_LINK_UPLOADFILE, formData, { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

}
