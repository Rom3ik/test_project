import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {JwtGeneratorService} from '../services/jwt-generator.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  payload;

  constructor(private authService: AuthService,
              private jwtService: JwtGeneratorService,
              private router: Router,
              private snackbar: MatSnackBar) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.payload = this.jwtService.getDecodedAccessToken(this.authService.currentAccessToken);
    const currentDate = new Date().getTime();
    if (this.authService.currentAccessToken && currentDate > this.payload.exp) {
      this.handleTokenExpireTime();
    } else {
      return next.handle(this.addAuthToken(httpRequest));
    }
  }

  addAuthToken(request: HttpRequest<any>): HttpRequest<any> {
    if (this.authService.currentAccessToken) {
      return request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.authService.currentAccessToken}`,
        })
      });
    } else {
      return request;
    }
  }

  handleTokenExpireTime(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.snackbar.open('Please login again', '', {
      duration: 2000
    });
  }
}
