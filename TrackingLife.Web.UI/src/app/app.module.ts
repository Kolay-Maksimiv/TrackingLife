// Core Module
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule }               from '@angular/platform-browser/animations';
import { BrowserModule, Title }                  from '@angular/platform-browser';
import { AppRoutingModule }                      from './app-routing.module';
import { NgbModule }                             from '@ng-bootstrap/ng-bootstrap';
import { Injector, NgModule }                              from '@angular/core';
import { FormsModule, ReactiveFormsModule }      from '@angular/forms';
import { MatSortModule, MatTableModule }         from '@angular/material';
import { TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Main Component
import { AppComponent }                    from './app.component';
// import { HeaderComponent }                 from './components/header/header.component';
import { SidebarComponent }                from './components/sidebar/sidebar.component';
import { SidebarRightComponent }           from './components/sidebar-right/sidebar-right.component';
import { TopMenuComponent }                from './components/top-menu/top-menu.component';
// import { FooterComponent }                 from './components/footer/footer.component';
import { PanelComponent }                  from './components/panel/panel.component';
// import { FloatSubMenuComponent }           from './components/float-sub-menu/float-sub-menu.component';


// Component Module
import { AgmCoreModule }                   from '@agm/core';
import { FullCalendarModule }              from '@fullcalendar/angular';
import { LoadingBarRouterModule }          from '@ngx-loading-bar/router';
import { NgxChartsModule }                 from '@swimlane/ngx-charts';
import { TrendModule }                     from 'ngx-trend';
import { HighlightJsModule }               from 'ngx-highlight-js';
import { CountdownModule }                 from 'ngx-countdown';
import { ChartsModule }                    from 'ng4-charts/ng4-charts';
import { TagInputModule }                  from 'ngx-chips';
import { SweetAlert2Module }               from '@sweetalert2/ngx-sweetalert2';
import { Ng2TableModule }                  from 'ngx-datatable/ng2-table';
import { NvD3Module }                      from 'ng2-nvd3';
import { NgxDaterangepickerMd }            from 'ngx-daterangepicker-material';
import 'd3';
import 'nvd3';
import { CalendarModule, DateAdapter }     from 'angular-calendar';
import { adapterFactory }                  from 'angular-calendar/date-adapters/date-fns';
import { PerfectScrollbarModule }          from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG }        from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { ImageCropperModule } from 'ngx-image-cropper';


//added components
import { LoginComponent } from './auth/login-component/login-component.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistrationComponent } from './auth/registration/registration.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserCreateComponent } from './components/user-management/user-create/user-create.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AuthInterceptor } from './auth/auth-interceptor';
export function HttpLoaderFactory(http: HttpClient) : TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locate/','.json'); 
}

@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    SidebarComponent,
    SidebarRightComponent,
    TopMenuComponent,
    // FooterComponent,
    PanelComponent,
    // FloatSubMenuComponent,
    // CropImageComponent,

    // added components
    LoginComponent,
    PageNotFoundComponent,
    RegistrationComponent,
    SafeHtmlPipe,
    ResetPasswordComponent,
    UserCreateComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    AppRoutingModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyC5gJ5x8Yw7qP_DqvNq3IdZi2WUSiDjskk' }),
    BrowserAnimationsModule,
    BrowserModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CountdownModule,
    ChartsModule,
    FullCalendarModule,
    FormsModule,
    HighlightJsModule,
    LoadingBarRouterModule,
    MatSortModule,
    MatTableModule,
    NgbModule,
    NvD3Module,
    NgxChartsModule,
    Ng2TableModule,
    NgxDaterangepickerMd.forRoot(),
    PerfectScrollbarModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    TagInputModule,
    TrendModule,
    EditorModule,
    ImageCropperModule,

    // added modules
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [ Title, {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
  },
  { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  {
    provide: HTTP_INTERCEPTORS,
      useFactory: (router: Router, injector: Injector) => new AuthInterceptor(router, injector),
      multi: true,
      deps: [Router, Injector]
  }
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        var title = 'Queally | ' + this.route.snapshot.firstChild.data['title'];
        this.titleService.setTitle(title);
      }
    });
  }
}
