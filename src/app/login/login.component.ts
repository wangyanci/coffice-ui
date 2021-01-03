import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';

import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Navigate } from '../models/navigate.model';
import { Observable, Observer, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public isregist: boolean = false;
  validateForm!: FormGroup;
  validateRegisterForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.validateRegisterForm = this.fb.group(
      {
        userName1: [
          null,
          [
            Validators.required,
            Validators.pattern(
              /^(?!_)(?!.*?_$)(?!\d)[a-zA-Z0-9_\u4e00-\u9fa5]+$/
            ),
            // Validators.maxLength(12),
            // Validators.minLength(6),
          ],
          [this.userNameAsyncValidator],
        ],
        password: [null, [Validators.required]],
        confirmpassword: [null, [Validators.required, this.confirmValidator]],
      },
      // { updateOn: 'blur' }
      { updateOn: 'change' }
    );

    this.validateForm = this.fb.group(
      {
        userName: [
          null,
          [
            Validators.required,
            // Validators.maxLength(12),
            // Validators.minLength(6),
            Validators.pattern(
              /^(?!_)(?!.*?_$)(?!\d)[a-zA-Z0-9_\u4e00-\u9fa5]+$/
            ),
          ],
        ],
        password: [null, [Validators.required]],
        remember: [true],
      },
      // { updateOn: 'blur' }
      { updateOn: 'change' }
    );
  }

  doLogin(): void {
    for (const i in this.validateForm.controls) {
      // console.log('xxxx controls: ', this.validateForm.controls[i]);
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.loginService
      .dologin(this.validateForm.value)
      .subscribe((navigate: any) => {
        // console.log("xxxxwyc navigate:", navigate)
        this.router.navigate(navigate.commands, navigate.extras);
      });

    console.log(this.validateForm.value);
  }

  doRegist() {
    // for (const i in this.validateForm.controls) {
    //   this.validateForm.controls[i].markAsDirty();
    //   this.validateForm.controls[i].updateValueAndValidity();
    // }

    // this.loginService
    //   .dologin(this.validateForm.value)
    //   .subscribe((navigate: any) => {
    //     // console.log("xxxxwyc navigate:", navigate)
    //     this.router.navigate(navigate.commands, navigate.extras);
    //   });

    console.log(this.validateForm.value);
  }

  goRegist() {
    this.validateRegisterForm.reset();
    this.isregist = !this.isregist;
  }

  userNameAsyncValidator = (
    control: FormControl
  ): Observable<ValidationErrors | null> =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      this.loginService.isUerNameExist(control.value).subscribe(
        (resp: any): any => {
          observer.next(null);
          observer.complete();
        },
        (error: any) => {
          observer.next({ error: true, duplicated: true });
          observer.complete();
        }
      );
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (
      control.value !== this.validateRegisterForm.controls.password.value
    ) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
