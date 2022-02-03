import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Event, Router} from "@angular/router";
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input('username') username;
  @Output('toggleMenu') toggleMenuMethod = new EventEmitter<Event>();

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.toggleMenuMethod.emit();
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
