import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // return request without modification with request the geocoder API
    if (request.url.startsWith(environment.geocoderAPI))
      return next.handle(request);

    // get json web token from AuthService
    const jwt = this.authService.getToken();

    // return request without modification if no token
    if (!jwt) return next.handle(request);

    // hard copy request and set 'Authorization' header with Bearer token
    const requestWithToken = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${jwt}`),
    });

    // return request with token
    return next.handle(requestWithToken);
  }
}
