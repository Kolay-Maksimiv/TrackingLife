import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompanyModel } from 'app/models/company/companies.model';
import { CompanyService } from 'app/services/company.service';
import { ToastService } from 'app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent implements OnInit {

  constructor(private companyService: CompanyService,
              private toastService: ToastService,
              private router: Router) { }

  ngOnInit() {
  }

  createCompany(form: NgForm) {
    if (form.valid) {

       const model = new CompanyModel(form.value);
       this.companyService.createCompany(model).subscribe(respData => {
          this.toastService.showSuccess("Company was created successfully");
          this.router.navigate(['/companies']);
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

}
