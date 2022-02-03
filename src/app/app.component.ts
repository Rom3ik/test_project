import {AfterContentChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {JwtGeneratorService} from './services/jwt-generator.service';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked {
  username;
  status = false;

  constructor(private router: Router,
              private jwtService: JwtGeneratorService,
              public authService: AuthService,
              private cdr: ChangeDetectorRef) {

  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(value => {
      this.username = value;
    });
    this.username = localStorage.getItem('username');
  }

  isAuthenticated(): boolean {
    let isAuthenticated = false;
    this.authService.isAuthenticated.subscribe(
      res => {
        isAuthenticated = res;
      }
    );
    return isAuthenticated;
  }

  toggleMenu(): void {
    this.status = !this.status;
  }
}

