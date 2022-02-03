import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  username = '';
  private formSubmitAttempt = false;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4), Validators.min(4)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.min(6)]]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.f.userName.value);
      this.router.navigate(['/dashboard']);
      this.formSubmitAttempt = true;
    }
  }

}
