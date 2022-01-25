import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewsModel } from 'app/models/news/news.model';
import { tap } from 'rxjs/operators';
import { HttpClientService } from 'app/shared/http-client/http-client.service';
import { Observable } from 'rxjs';
import { NewsSearchFilter } from 'app/models/news/newsSearchFilter';
import { ListItemsModel } from 'app/models/abstract/listItemsModel';
import { AuthService } from 'app/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class NewsService {

  myHeaders: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient, private router: Router, private _authService: AuthService) {
  }

  getNews(filter: NewsSearchFilter) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
    this.myHeaders = this.myHeaders.append('Authorization', token);

    return this.http.get<ListItemsModel>(HttpClientService.NEWS_CONTROLLER, {
      headers: this.myHeaders, params: {
        searchKeyWordByDate: filter.searchKeyWordByDate,
        searchKeyWordByLevel: filter.searchKeyWordByLevel,
        searchKeyWordByTitle: filter.searchKeyWordByTitle,
        dateFrom: filter.dateFrom,
        dateTo: filter.dateTo,
        pageNumber: String(filter.pageNumber),
        take: String(filter.take),
        orderType: String(filter.orderType),
        categoryId: String(filter.categoryId)
      }
    })
      .pipe(tap(resData => {
      },
        error => {
          console.log(error);

        }));
  }

  getNewsById(id: number) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.get<NewsModel>(HttpClientService.NEWS_CONTROLLER.concat("/", id.toString()), { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

  getEditNewsById(id: number) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);
    return this.http.get<NewsModel>(HttpClientService.NEWS_CONTROLLER_EDIT.concat("/", id.toString()), { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

  create(data: NewsModel) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.post(HttpClientService.NEWS_СREATE_CONTROLLER, data, { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

  edit(data: NewsModel) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.put(HttpClientService.NEWS_CONTROLLER, data, { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }


  upload(newsId: number, formData: any) {
    this.myHeaders = new HttpHeaders();
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.post(`${HttpClientService.NEWS_CONTROLLER_UPLOAD}/${newsId}`, formData, { headers: this.myHeaders })
      .pipe(tap(resData => {
      }));
  }

  deleteNews(id: number) {
    this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
    let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
    let token = 'Bearer ' + accessToken;
    this.myHeaders = this.myHeaders.append('Authorization', token);
    this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
    this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

    return this.http.delete(HttpClientService.NEWS_CONTROLLER.concat("/", id.toString()), { headers: this.myHeaders })
      .pipe(tap(resData => {
        this.router.navigate(['/news']);
      }));
  }

  public escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  public replaceAll(str, search, replacement) {
    return str.replace(new RegExp(this.escapeRegExp(search), 'g'), replacement);
  }

  // public upload(formData: FormData): Observable<Array<any>> {
  //   return this._customHttpClient.post(HttpClientService.NEWS_CONTROLLER_UPLOAD, formData, null)
  //   .pipe(tap(resData => {}));
  // }

  // public uploadExternal(formData: FormData): Observable<Array<any>> {
  //   return this._customHttpClient.post(HttpClientService.NEWS_CONTROLLER_FILE_UPLOAD, formData, null)
  //   .pipe(tap(resData => {}));
  // }

  // public download(fileId: number, newsId: number): Observable<any> {
  //   const url = HttpClientService.NEWS_CONTROLLER_FILE_DOWNLOAD.concat("/", fileId.toString());

  //   this.myHeaders = new HttpHeaders().set("Content-Type", "application/octet-stream");
  //   let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
  //   let token = 'Bearer ' + accessToken;
  //   this.myHeaders = this.myHeaders.append('Authorization', token);
  //   this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
  //   this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

  //   return this._customHttpClient.get(url, { headers: this.myHeaders });
  // }

  // public attachFiles(files): Observable<any> {
  //   let storageNewsId = localStorage.getItem("newsId");
  //   let newsId = storageNewsId && storageNewsId !== 'undefined' ? storageNewsId : "0";

  //   this.myHeaders = new HttpHeaders().set("Content-Type", "application/json;");
  //   let accessToken = JSON.parse(localStorage.getItem('dataSource')).access_token;
  //   let token = 'Bearer ' + accessToken;
  //   this.myHeaders = this.myHeaders.append('Authorization', token);
  //   this.myHeaders = this.myHeaders.append('client_id', 'news_now_spa');
  //   this.myHeaders = this.myHeaders.append('newsId', newsId);
  //   this.myHeaders = this.myHeaders.append("Access-Control-Allow-Origin", HttpClientService.WEB);

  //   return this._customHttpClient.post(HttpClientService.NEWS_CONTROLLER_FILE_ATTACH, files, { headers: this.myHeaders });
  // }

  // public delete(id: number): Observable<number> {
  //   var params = {
  //     id: id
  //   };

  //   return this._customHttpClient.delete(HttpClientService.NEWS_CONTROLLER_FILE, params);
  // }

}
