import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import pageSettings from 'app/config/page-settings';
import { AnalyticsPeriod } from 'app/enums/AnalyticsPeriod';
import { DashboardResponceModel, NameValueViewMode } from 'app/models/dashboard/dashboard.model';
import { DashboardFilter, lastDate } from 'app/models/dashboard/dashboardFilter';
import { DashboardService } from 'app/services/dashboard.service';
import { ToastService } from 'app/services/toast.service';
import { CompanyService } from 'app/services/company.service';
import { Subject } from 'rxjs';
import { CompanyModel } from 'app/models/company/companies.model';
import { SectionTypes, sectionTypeWithSpaceObj } from 'app/enums/SectionTypes';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {
  pageSettings = pageSettings;
  constructor(private dashboardService: DashboardService,
    private toastService: ToastService,
    private companyService: CompanyService) {
    this.pageSettings.pageWithoutSidebar = false;
  }

  ngOnInit() {
    this.pageSettings.pageWithoutSidebar = false;
  }
}
