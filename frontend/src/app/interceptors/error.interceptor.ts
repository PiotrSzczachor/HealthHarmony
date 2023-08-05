import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorDetails } from '../shared/models/error-details.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private toast: ToastrService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.log(error)
                    var errorDetails = error.error instanceof ErrorDetails ? error.error : undefined;
                    if (errorDetails) {
                        this.handleServerSideError(errorDetails.statusCode, errorDetails.message);
                    }
                    else if (error.error instanceof ErrorEvent) {
                        this.handleClientSideError(error.error);
                    } else {
                        this.handleServerSideError(error.status, error.message)
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
