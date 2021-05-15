import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../../services/authorization.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public service: AuthorizationService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}
  loginForm = this.fb.group({
    userName: ['', this.service.userNameValidation],
    password: ['', this.service.passwordValidation],
  });

  login(event: any) {
    event.preventDefault();

    var user = {
      UserName: this.loginForm.get('userName')?.value,
      Password: this.loginForm.get('password')?.value,
    };

    this.http
      .post('https://localhost:5001/api/auth/login', user)
      .subscribe((res: any) => {
        if (res.succeeded) {
          localStorage.setItem('token', res.token);
          console.log('Login success');
          console.log(
            'login Url : ' + this.activatedRoute.snapshot.queryParams.returnUrl
          );

          this.router.navigateByUrl(
            this.activatedRoute.snapshot.queryParams.returnUrl
          );
        } else {
          console.log('Login failed');
          console.log(res);
        }
      });
  }
}
