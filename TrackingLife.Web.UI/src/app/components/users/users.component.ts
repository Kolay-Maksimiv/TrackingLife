import { AuthService } from 'app/auth/auth.service';
import { UsersModel } from './../../models/users/users.model';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersService } from 'app/services/users.service';
import Swal from 'sweetalert2';
import { ToastService } from 'app/services/toast.service';
import { UsersOrderType } from 'app/enums/usersOrderType';
import { UsersSearchFilter } from 'app/models/users/usersSearchFilter';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/Rx';
import { CompanyModel } from 'app/models/company/companies.model';
import { CompanyService } from 'app/services/company.service';
import * as saveAs from 'file-saver';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  error: string = null;
  users: UsersModel[] = [];
  companies: CompanyModel[];
  userRole: string[];
  companyId: number;
  //search and pagination
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  searchByName = new FormControl("");
  searchByEmail = new FormControl("");
  searchByComnany = new FormControl("");
  searchByAccessLevel = new FormControl("");
  orderBy: UsersOrderType;
  filter: UsersSearchFilter;
  isActivate : boolean = false;
  public page: number = 1;
  public previousPage: number;
  public itemsPerPage: number = 10;
  public numPages: number = 1;
  public length: number = 0;
  //end search and pagination

  constructor(private http: HttpClient, private usersService: UsersService,
    private toastService: ToastService,
    private companyService: CompanyService,
    private authService: AuthService, private router: Router) {
    this.orderBy = UsersOrderType.ProfileId;
    this.filter = new UsersSearchFilter(1, this.itemsPerPage, false, UsersOrderType.ProfileId, '', '', '', '');
    this.userRole = this.authService.currentUser.roles;
  }


  ngOnInit() {
    this.search(this.searchByName.valueChanges);
    this.search(this.searchByEmail.valueChanges);
    this.search(this.searchByComnany.valueChanges);
    this.search(this.searchByAccessLevel.valueChanges);
    this.getUsers();
    this.getCompaniesList();
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

  initFilter() {
    this.filter.pageNumber = this.page;
    this.filter.take = this.itemsPerPage;
    this.filter.searchKeyWordByName = this.searchByName.value;
    this.filter.searchKeyWordByEmail = this.searchByEmail.value;
    this.filter.searchKeyWordByCompany = this.searchByComnany.value;
    this.filter.searchByAccessLevel = this.searchByAccessLevel.value;
    this.filter.orderType = this.orderBy;
    this.getUsers();
  }

  getActiveUser() {
    this.filter.isRemoved = false;
    this.isActivate = false;
    this.initFilter();
    this.getUsers();
  }

  getArchiveUser() {
    this.filter.isRemoved = true;
    this.isActivate = true;
    this.initFilter();
    this.getUsers();
  }

  getUsers() {
    this.isLoading = false;
    this.usersService.getUsersByFilter(this.filter).subscribe(respData => {
      this.users = respData.items;
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

  newCompanySelected(companyName) {
    if (companyName == 'All') {
      this.companyId = null;
    } else {
      this.companyId = this.companies.find(x => x.name === companyName).id;
    }
    this.getUsers();
  }

  getCompaniesList() {
    this.companyService.getCompanies().subscribe((respData: CompanyModel[]) => {
      this.companies = respData;
    },
      error => {
        if (error.error) {
          this.toastService.showError(error.error);
        } else {
          this.toastService.showError("Some error occured");
        }
      });
  }

  //search
  sortItems(column: string) {
    this.isLoading = true;

    switch (column.toLowerCase()) {
      case "id":
        this.orderBy = this.orderBy == UsersOrderType.ProfileId ? UsersOrderType.ProfileIdDesc : UsersOrderType.ProfileId;
        break;
      case "firstname":
        this.orderBy = this.orderBy == UsersOrderType.FirstName ? UsersOrderType.FirstNameDesc : UsersOrderType.FirstName;
        break;
      case "lastname":
        this.orderBy = this.orderBy == UsersOrderType.LastName ? UsersOrderType.LastNameDesc : UsersOrderType.LastName;
        break;
      case "email":
        this.orderBy = this.orderBy == UsersOrderType.Email ? UsersOrderType.EmailDesc : UsersOrderType.Email;
        break;
      case "organisation":
        this.orderBy = this.orderBy == UsersOrderType.Organisation ? UsersOrderType.OrganisationDesc : UsersOrderType.Organisation;
        break;
    }

    //this.filter.orderType = this.orderBy;
    this.initFilter();
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.page = page;
      //   this.filter.pageNumber = page;
      this.initFilter();
    }
  }
  //end search

  clickDownloadCsv() {
    this.usersService.exportCsv().subscribe((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-16le"
      });
      FileSaver.saveAs(blob, "users.csv");
    })
  }

  createUserRedirect() {
    this.router.navigate(['/create']);
  }

  activateUser(id: string) {
    Swal.fire({
      title: 'Are you sure you want to  activated this User?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.usersService.activateUser(id).subscribe(respData => {
          Swal.fire(
            'Activate!',
            'User has been activate.',
            'success'
          ).then(res => {
            if (res.value) {
              this.users = this.users.filter(x => x.id !== id);
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

  deleteUser(id: string) {
    Swal.fire({
      title: 'Are you sure you want to archive this User?',
      text: 'The user will not be able to login to the site.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.usersService.deleteUser(id).subscribe(respData => {
          Swal.fire(
            'Archive!',
            'User has been archived.',
            'success'
          ).then(res => {
            if (res.value) {
              this.users = this.users.filter(x => x.id !== id);
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
