import { Component, Input, Output, EventEmitter, Renderer2, OnDestroy, OnInit } from '@angular/core';
import pageSettings from '../../config/page-settings';
import { AuthService } from 'app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'header',
	templateUrl: './header.component.html',
	//styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
	@Input() pageSidebarTwo;
	@Output() toggleSidebarRightCollapsed = new EventEmitter<boolean>();
	@Output() toggleMobileSidebar = new EventEmitter<boolean>();
	@Output() toggleMobileRightSidebar = new EventEmitter<boolean>();
	pageSettings = pageSettings;


	constructor(private renderer: Renderer2, private authService: AuthService) {
	}

	//variables
	isAuthenticated: boolean = true;//should be false by default
	userEmail: string = "";
	//subscription
	private userSub: Subscription;

	mobileSidebarToggle() {
		this.toggleMobileSidebar.emit(true);
	}
	mobileRightSidebarToggle() {
		this.toggleMobileRightSidebar.emit(true);
	}
	toggleSidebarRight() {
		this.toggleSidebarRightCollapsed.emit(true);
	}

	mobileTopMenuToggle() {
		this.pageSettings.pageMobileTopMenuToggled = !this.pageSettings.pageMobileTopMenuToggled;
	}

	mobileMegaMenuToggle() {
		this.pageSettings.pageMobileMegaMenuToggled = !this.pageSettings.pageMobileMegaMenuToggled;
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		this.pageSettings.pageMobileTopMenuToggled = false;
		this.pageSettings.pageMobileMegaMenuToggled = false;

		if (this.userSub)
			this.userSub.unsubscribe();
	}

	logout() {
		this.authService.logout();
	}

}
