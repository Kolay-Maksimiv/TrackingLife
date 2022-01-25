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

  @Input() datePeriodSubject: Subject<AnalyticsPeriod> = new Subject<AnalyticsPeriod>();

  pageSettings = pageSettings;
  dashboardResponce: DashboardResponceModel;
  sectionName: string;
  companyId: number;
  lastDate = new lastDate();
  period: AnalyticsPeriod;
  sectionTypes: SectionTypes;
  filter: DashboardFilter;
  installedApps: any[];
  newUser: any[];
  activeUsers: any[];
  popularSection: any[];
  popularNews: any[];
  popularLinks: any[];
  popularDocuments: any[];
  companies: CompanyModel[];
  diffInstalledApps: number;
  diffNewUser: number;
  diffActiveUsers: number;
  diffPopularSection: number;
  diffPopularNews: number;
  diffPopularLinks: number;
  diffPopularDocuments: number;
  showLoader: boolean = false;

  //Total
  installedAppsTotal: number;
  newUserTotal: number;
  activeUsersTotal: number;
  popularSectionTotal: number;
  popularNewsTotal: number;
  popularLinksTotal: number;
  popularDocumentsTotal: number;
  isYear: boolean = false;

  // options
  legend: boolean = true;
  showLegend = true;
  autoScale: boolean = true;
  legendPosition: string = 'right';

  colorSchemeUsers = {
    domain: ['#A8879F']
  };

  colorSchemePopular = {
    domain: ['#97CE8B', '#A8879F', '#C1D72E', '#C49A6C', '#74CABF', '#EE4B46']
  };

  constructor(private dashboardService: DashboardService,
    private toastService: ToastService,
    private companyService: CompanyService) {
    this.period = AnalyticsPeriod.Month;
    this.pageSettings.pageWithoutSidebar = false;
  }

  ngOnInit() {
    this.datePeriodSubject.next(this.period);
    this.pageSettings.pageWithoutSidebar = false;
    this.period = AnalyticsPeriod.Month;
    this.getDashboardData();
    this.datePeriodSubject.subscribe(event => {
      this.period = Number(event);
      this.getDashboardData();
    })
    this.getCompaniesList();
  }

  // toDay = this.lastDate.lastD.setDate(this.lastDate.lastD.getDate());
  // lastWeek = this.lastDate.lastW.setDate(this.lastDate.lastW.getDate() - 7);
  // lastMonth = this.lastDate.lastM.setMonth(this.lastDate.lastD.getMonth() - 1);
  // lastYear = this.lastDate.lastY.setFullYear(this.lastDate.lastY.getFullYear() - 1);

  getDashboardData() {
    this.showLoader = true;
    this.filter = new DashboardFilter();
    var today = new Date();
    this.filter.dateTo = today;
    switch (this.period) {
      case AnalyticsPeriod.Today:
        this.filter.dateFrom = today;
        this.isYear = false;
        break;

      case AnalyticsPeriod.Week:
        var weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);
        this.filter.dateFrom = weekAgo;
        this.isYear = false;
        break;

      case AnalyticsPeriod.Month:
        var monthAgo = new Date();
        monthAgo.setMonth(today.getMonth() - 1);
        this.filter.dateFrom = monthAgo;
        this.isYear = false;
        break;

      case AnalyticsPeriod.Year:
        var yearAgo = new Date();
        yearAgo.setFullYear(today.getFullYear() - 1);
        this.filter.dateFrom = yearAgo;
        this.isYear = true;
        break;

      default:
      // this.filter.dateFrom = this.toDay;
      // this.filter.dateTo =  this.toDay;
    }

    this.filter.companyId = this.companyId;
    this.dashboardService.getDashbordData(this.filter).subscribe((respData: DashboardResponceModel) => {
      this.dashboardResponce = respData;
      this.installedAppsTotal = respData.installedApps.total;
      this.installedApps = respData.installedApps.data;
      this.newUserTotal = respData.newUsers.total;
      this.newUser = respData.newUsers.data;
      this.activeUsersTotal = respData.activeUsers.total;
      this.activeUsers = respData.activeUsers.data;
      this.popularSectionTotal = respData.popularSections.total;
      this.popularSection = respData.popularSections.data;
      this.popularNewsTotal = respData.popularNews.total;
      this.popularNews = respData.popularNews.data;
      this.popularLinksTotal = respData.popularLinks.total;
      this.popularLinks = respData.popularLinks.data;
      this.popularDocumentsTotal = respData.popularDocuments.total;
      this.popularDocuments = respData.popularDocuments.data;
      this.showLoader = false;
      if (respData.installedApps.prevCount >= 0 && respData.installedApps.prevCount < respData.installedApps.total) {
        this.diffInstalledApps = Math.floor((respData.installedApps.prevCount / respData.installedApps.total - 1) * 100) * -1;
      } else {
        this.diffInstalledApps = Math.floor((respData.installedApps.total / respData.installedApps.prevCount - 1) * 100);
      }

      if (respData.newUsers.prevCount >= 0 && respData.newUsers.prevCount < respData.newUsers.total) {
        this.diffNewUser = Math.floor((respData.newUsers.prevCount / respData.newUsers.total - 1) * 100) * -1;
      } else {
        this.diffNewUser = Math.floor((respData.newUsers.total / respData.newUsers.prevCount - 1) * 100);
      }

      if (respData.activeUsers.prevCount >= 0 && respData.activeUsers.prevCount < respData.activeUsers.total) {
        this.diffActiveUsers = Math.floor((respData.activeUsers.prevCount / respData.activeUsers.total - 1) * 100) * -1;
      } else {
        this.diffActiveUsers = Math.floor((respData.activeUsers.total / respData.activeUsers.prevCount - 1) * 100);
      }

      if (respData.popularSections.prevCount >= 0 && respData.popularSections.prevCount < respData.popularSections.total) {
        this.diffPopularSection = Math.floor((respData.popularSections.prevCount / respData.popularSections.total - 1) * 100) * -1;
      } else {
        this.diffPopularSection = Math.floor((respData.popularSections.total / respData.popularSections.prevCount - 1) * 100);
      }

      if (respData.popularNews.prevCount >= 0 && respData.popularNews.prevCount < respData.popularNews.total) {
        this.diffPopularNews = Math.floor((respData.popularNews.prevCount / respData.popularNews.total - 1) * 100) * -1;
      } else {
        this.diffPopularNews = Math.floor((respData.popularNews.total / respData.popularNews.prevCount - 1) * 100);
      }

      if (respData.popularLinks.prevCount >= 0 && respData.popularNews.prevCount < respData.popularNews.total) {
        this.diffPopularLinks = Math.floor((respData.popularLinks.prevCount / respData.popularLinks.total - 1) * 100) * -1;
      } else {
        this.diffPopularLinks = Math.floor((respData.popularLinks.total / respData.popularLinks.prevCount - 1) * 100);
      }

      if (respData.popularDocuments.prevCount >= 0 && respData.popularDocuments.prevCount < respData.popularDocuments.total) {
        this.diffPopularDocuments = Math.floor((respData.popularDocuments.prevCount / respData.popularDocuments.total - 1) * 100) * -1;
      } else {
        this.diffPopularDocuments = Math.floor((respData.popularDocuments.total / respData.popularDocuments.prevCount - 1) * 100);
      }


      this.popularSection.forEach((item: NameValueViewMode) => {
        item.name = sectionTypeWithSpaceObj.find(s => s.name == item.name).value;
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
  }

  newPeriodSelected(event) {
    this.datePeriodSubject.next(event.target.value)
  }

  newCompanySelected(companyId) {
    if (companyId == 'All') {
      this.companyId = null;
    } else {
      this.companyId = companyId;
    }
    this.getDashboardData();
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
}
