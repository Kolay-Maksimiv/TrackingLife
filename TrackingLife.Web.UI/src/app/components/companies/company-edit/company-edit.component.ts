import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'app/models/company/companies.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyService } from 'app/services/company.service';
import { ToastService } from 'app/services/toast.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  company: CompanyModel;
  private sub: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private companyService: CompanyService,
              private toastService: ToastService) {
    this.company = new CompanyModel();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      var id = params['id'];
      if (id) {
        this.getCompany(id);
      } else {
        this.router.navigate(['/not-found']);
      }
   });

  }

  getCompany(id: number){
    this.companyService.getCompanyById(id).subscribe(
      respData => {
        this.company = new CompanyModel(respData);
      },
      error => {
        if (error.error) {
          this.toastService.showError(error.error);
          } else {
            this.toastService.showError("Some error occured");
          }
         this.router.navigate(['/not-found']);
       }
    );
  }

  saveButtonClick(){
    this.companyService.editCompany(this.company).subscribe(respData => {
      this.toastService.showSuccess("Company was edited successfully");
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

  cancelButton(){
    this.router.navigate(['/companies']);
  }
}
