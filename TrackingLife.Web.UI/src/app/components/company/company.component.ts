import { CompanyService } from '../../services/company.service';
import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'app/models/company/companies.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastService } from 'app/services/toast.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  error: string = null;
  companies: CompanyModel[] = [];

  constructor(private http: HttpClient,
    private companyService: CompanyService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit() {
    this.companyService.getCompanies().subscribe(respData => {
      this.companies = respData;
    },
      error => {
        console.log(error.error);
        this.error = "Some error occured";
      }
    );
  }

  createCompanyRedirect() {
    this.router.navigate(['companies/add']);
  }

  editCompany(model: CompanyModel) {
    this.companyService.editCompany(model).subscribe(respData => {
    },
      error => {
        console.log(error.error);
        this.error = "Some error occured";
      }
    );
  }

  deleteCompany(model: CompanyModel) {
    Swal.fire({
      title: 'Are you sure you want to delete this Company?',
      text: 'You will not be able to undo this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.companyService.deleteCompany(model.id).subscribe(respData => {
          Swal.fire(
            'Deleted!',
            'Company has been deleted.',
            'success'
          ).then(res => {
            if (res.value) {
              this.companies = this.companies.filter(x => x.id !== model.id);
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
