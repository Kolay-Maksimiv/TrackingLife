
import {of as observableOf,  Observable ,  Subscriber } from 'rxjs';

import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Injectable, Injector } from "@angular/core";



import { AuthService } from './auth.service';

type CallerRequest = {
    subscriber: Subscriber<any>;
    failedRequest: HttpRequest<any>;
};


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private _refreshInProgress: boolean;
    private _requests: CallerRequest[] = [];
    private _authService: AuthService;
    private _httpClient: HttpClient;

    private get authService() {
        if (!this._authService)
            this._authService = this.injector.get(AuthService);

        return this._authService;
    }

    private get httpClient() {
        if (!this._httpClient)
            this._httpClient = this.injector.get(HttpClient);

        return this._httpClient;
    }

    constructor(private router: Router,
        private injector: Injector) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let observable = new Observable<HttpEvent<any>>((subscriber) => {
            let originalRequestSubscription = next.handle(req)
                .subscribe((response) => {
                    subscriber.next(response);
                },
                    (error) => {
                        // if (error.status === 409) {
                        //     this.handleConflictResult();
                        //     return observableOf(error);
                        // }

                        if (error.status === 401) {
                            this.handleUnauthorizedError(subscriber, req);
                            } else {
                            subscriber.error(error);
                            }
                        // else if (error.status === 403) {
                        //     this.router.navigateByUrl('/dashboard');
                        //     return observableOf(error);
                        // }
                        // else {
                        //     subscriber.error(error);
                        //}
                    },
                    () => {
                        subscriber.complete();
                    });

            return () => {
                originalRequestSubscription.unsubscribe();
            };
        });

        return observable;
    }

    private handleConflictResult(): void {
        this.router.navigateByUrl('/login');
        if (typeof (Storage) !== "undefined") {
            localStorage.clear();
        }
    }

    private handleUnauthorizedError(subscriber: Subscriber<any>, request: HttpRequest<any>) {
        //this._requests.push({ subscriber, failedRequest: request });
        console.log('handleUnauthorizedError');
        this.router.navigateByUrl('/login');
        //this.authService.signoutRedirect();
    }
}   
