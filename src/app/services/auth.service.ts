import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {JwtGeneratorService} from './jwt-generator.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new Subject<boolean>();
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  JWT;
  user = null;
  currentAccessToken = null;

  constructor(private http: HttpClient,
              private  jwtService: JwtGeneratorService,) {
    this.loadTokens();
  }

  loadTokens(): void {
    const access = localStorage.getItem('access_token');
    if (access) {
      this.currentAccessToken = access;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(username): Observable<any> {
    this.jwtService.createToken();
    this.JWT = this.jwtService.getToken();
    return this.JWT.subscribe(
      res => {
        this.user$.next(username);
        this.currentAccessToken = res;
        localStorage.setItem('username', username);
        localStorage.setItem('access_token', res);
        this.isAuthenticated.next(true);
      }
    );
  }

  logout(): void {
    this.isAuthenticated.next(false);
    localStorage.clear();
    this.currentAccessToken = null;
  }
}
