import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpParams, HttpParameterCodec } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { LoginEmailService } from "../services/auth/login/login-email.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    protected loginServiece: LoginEmailService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('inter sept')
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.loginServiece.getCookie()}`
      }
    });

    return next.handle(req);
  }
}