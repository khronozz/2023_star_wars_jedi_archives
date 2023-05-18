import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err, caught) => {
        console.error("HTTP INTERCEPTOR ERROR", err);
        Swal.fire({
          title: 'Erreur',
          text: err.error ? err.error.message : err.message,
          icon: 'error',
        });
        throw err;
      })
    );
  }
}
