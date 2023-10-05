import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorDetails } from '../models/shared/error-details.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private toast: ToastrService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.error(error);
                    const errorType = typeof error.error;
                    if (errorType === 'object' && error.error !== null && error.error.hasOwnProperty('StatusCode') && error.error.hasOwnProperty('Message') && error.error.hasOwnProperty('ExceptionType')) {
                        this.handleServerSideError(error.error.StatusCode, error.error.Message);
                    }
                    else if (errorType === 'object' && error.error instanceof ErrorEvent) {
                        this.handleClientSideError(error.error);
                    } else {
                        this.handleServerSideError(error.status, error.message);
                    }
                    return throwError(() => error);
                })
            )
    }

    handleClientSideError(error: ErrorEvent): void {
        this.toast.error(error.message);
    }

    private handleServerSideError(statusCode: number, message: string): void {
        if (statusCode === 401) {

        } else if (statusCode === 403) {
            //this.notAuthorized();
        }
        this.toast.error(message, statusCode as unknown as string);
    }

}
