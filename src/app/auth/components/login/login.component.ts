import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { errorsSelector, isSubmittingSelector } from '../../store/selectors';
import { loginAction } from '../../store/actions/login.action';
import BackendErrors from 'src/app/shared/models/backend-errors';
import LoginRequest from '../../models/login-request';

@Component({
  selector: 'med-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  isSubmitting$: Observable<boolean> = new Observable();
  errors$: Observable<BackendErrors | null> = new Observable();

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initForm();
    this.initValues();
  }

  onSubmit(): void {
    console.log('Submitted', this.form.value);
    const request: LoginRequest = {
      user: this.form.value,
    };
    this.store.dispatch(loginAction({ request }));
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private initValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.errors$ = this.store.pipe(select(errorsSelector));
  }
}
