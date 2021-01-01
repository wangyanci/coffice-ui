import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Navigate } from '../models/navigate.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public isregist: boolean = false;
  validateForm!: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
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

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  goRegist() {
    this.isregist = !this.isregist;
    console.log('xxxxisregist: ', this.isregist);
  }
}
