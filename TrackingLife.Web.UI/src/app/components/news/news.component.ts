import { NewsService } from 'app/services/news.service';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NewsModel } from 'app/models/news/news.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastService } from 'app/services/toast.service';
import { NewsOrderType } from 'app/enums/newsOrderType';
import { NewsSearchFilter } from 'app/models/news/newsSearchFilter';
import { Subject } from 'rxjs/Subject';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { stringify } from 'querystring';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CategoryService } from 'app/services/category.service';
import { CategoryModel } from 'app/models/category/categories.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewsComponent implements OnInit, OnDestroy {
  error: string = null;
  newses: NewsModel[] = [];
  isLoading: boolean = false;
  date: any;
  dateFrom: any;
  dateTo: any;
  level: string;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  categoriesList: CategoryModel[];
  categoryId: number;
  //search and pagination
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  searchByTitle = new FormControl("");
  searchByLevel = new FormControl("");
  orderBy: NewsOrderType;
  filter: NewsSearchFilter;

  public page: number = 1;
  public previousPage: number;
  public itemsPerPage: number = 10;
  public numPages: number = 1;
  public length: number = 0;
  //end search and pagination

  constructor(private http: HttpClient,
    private newsService: NewsService,
    private toastService: ToastService,
    private categoryService: CategoryService,
    private router: Router) {
    this.orderBy = NewsOrderType.IdDesc;
    this.filter = new NewsSearchFilter(1, this.itemsPerPage, NewsOrderType.IdDesc, 0, '', '', '', false);
  }

  ngOnInit() {
    this.search(this.searchByTitle.valueChanges);
    this.search(this.searchByLevel.valueChanges);

    this.getNews();
    this.getCategories();
    // this.newsService.getNews().subscribe(respData => {
    //     this.newses = respData;
    // }
    // );
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  search(terms: Observable<string | boolean>) {
    this.isLoading = true;

    terms.debounceTime(500)
      .distinctUntilChanged()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
        this.initFilter();
      });
  }

  onChangeLevel(event) {

  }

  initFilter() {
    this.filter.pageNumber = this.page;
    this.filter.take = this.itemsPerPage;
    this.filter.searchKeyWordByTitle = this.searchByTitle.value;
    this.filter.searchKeyWordByLevel = this.searchByLevel.value == 1 ? "Draft" : (this.searchByLevel.value == 2 ? "Published" : "");
    if (this.date) {
      this.filter.searchKeyWordByDate = this.getDateInStringFormat(this.date.day, this.date.month, this.date.year);
    } else {
      this.filter.searchKeyWordByDate = "";
    }

    if (this.dateFrom) {
      this.filter.dateFrom = this.getDateInStringFormat(this.dateFrom.day, this.dateFrom.month, this.dateFrom.year);
    } else {
      this.filter.dateFrom = "";
    }

    if (this.dateTo) {
      this.filter.dateTo = this.getDateInStringFormat(this.dateTo.day, this.dateTo.month, this.dateTo.year);
    } else {
      this.filter.dateTo = "";
    }

    this.filter.orderType = this.orderBy;

    this.filter.categoryId = this.categoryId;

    this.getNews();
  }

  getDateInStringFormat(day: number, month: number, year: number): string {
    if (day == undefined || month == undefined || year == undefined) {
      return "";
    }

    var dayStr = "";
    var monthStr = "";
    var yearStr = "";
    if (day < 10) {
      dayStr = "0" + day;
    } else {
      dayStr = day.toString();
    }

    if (month < 10) {
      monthStr = "0" + month;
    } else {
      monthStr = month.toString();
    }

    return dayStr + "/" + monthStr + "/" + year;
  }

  onDateChange() {
    this.initFilter();
  }

  onCategoryChange() {
    this.categoryId = parseInt(this.selectedItems.map(x => { return x.item_id }).toString());
    this.initFilter();
  }

  getNews() {
    // this.isLoading = false;
    //  this.newsService.getNews().subscribe(respData => {
    //     this.newses = respData;
    // }
    // );
    this.isLoading = false;
    this.newsService.getNews(this.filter).subscribe(respData => {
      this.newses = respData.items;
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


  createNewsRedirect() {
    this.router.navigate(['/news/add']);
  }
  createCategoryRedirect() {
    this.router.navigate(['/categories/add']);
  }

  deleteNews(news: NewsModel) {
    Swal.fire({
      title: 'Are you sure you want to archive this item?',
      text: 'You will not be able to undo this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.newsService.deleteNews(news.id).subscribe(respData => {
          Swal.fire(
            'Archive!',
            'News has been archive.',
            'success'
          ).then(res => {
            if (res.value) {
              this.newses = this.newses.filter(x => x.id !== news.id);
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
  sortItems(column: string) {
    this.isLoading = true;
    switch (column.toLowerCase()) {
      case "id":
        this.orderBy = this.orderBy == NewsOrderType.Id ? NewsOrderType.IdDesc : NewsOrderType.Id;
        break;
      case "date":
        this.orderBy = this.orderBy == NewsOrderType.Date ? NewsOrderType.DateDesc : NewsOrderType.Date;
        break;
      case "level":
        this.orderBy = this.orderBy == NewsOrderType.Level ? NewsOrderType.LevelDesc : NewsOrderType.Level;
        break;
      case "publisheddate":
        this.orderBy = this.orderBy == NewsOrderType.PublishedDate ? NewsOrderType.PublishedDateDesc : NewsOrderType.PublishedDate;
        break;
      case "publishedto":
        this.orderBy = this.orderBy == NewsOrderType.PublishedTo ? NewsOrderType.PublishedToDesc : NewsOrderType.PublishedTo;
        break;
    }
    this.filter.orderType = this.orderBy;
    this.getNews();
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.page = page;
      //   this.filter.pageNumber = page;
      this.initFilter();
    }
  }

  getCategories() {
    this.categoryService.getCategoriesListForDropDown().subscribe(
      respData => {
        this.categoriesList = respData;
        if (respData) {
          this.dropdownList = respData.map(x => { return { 'item_id': x.id, 'item_text': x.name } });
        }
      },
      error => {
        if (error.error) {
          this.toastService.showError(error.error);
        } else {
          this.toastService.showError("Some error occured");
        }
      }
    );
  }

}
