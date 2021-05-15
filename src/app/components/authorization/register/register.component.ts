import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../../services/authorization.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public service: AuthorizationService
  ) {}

  registerForm = this.fb.group(
    {
      userName: ['', this.service.userNameValidation],
      password: ['', this.service.passwordValidation],
      cPassword: ['', this.service.cPasswordValidation],
      birthday: [''],
      email: ['', this.service.emailValidation],
    },
    { validator: this.service.passwordsValidator }
  );

  submit(event: any) {
    event.preventDefault();

    var user = {
      UserName: this.registerForm.get('userName')?.value,
      Password: this.registerForm.get('password')?.value,
      Birthday: this.registerForm.get('birthday')?.value,
      Email: this.registerForm.get('email')?.value,
    };

    this.http.post('https://localhost:5001/api/auth/register', user).subscribe(
      (res: any) => {
        if (res.succeeded) this.router.navigateByUrl('/');
        else
          res.errors.forEach((element: any) => {
            alert('Error :' + element.description);
          });
      },
      (err) => {
        if (err.name === 'HttpErrorResponse')
          alert('Sorry, the server not response');
        else console.log(err.name);
      }
    );
  }
}
