import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor() {}

  userNameValidation = [Validators.required, Validators.maxLength(30)];
  passwordValidation = Validators.compose([
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(30),
    AuthorizationService.patternValidator(/\d/, {
      /*hasNumber: true*/
    }),
    AuthorizationService.patternValidator(/[A-Z]/, {
      /*hasUpperCase: true */
    }),
    AuthorizationService.patternValidator(/[a-z]/, {
      /*hasLowerCase: true */
    }),
    AuthorizationService.patternValidator(
      /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/,
      {
        /*hasSpicalCharacter: true */
      }
    ),
  ]);
  cPasswordValidation = Validators.required;
  birthdayValidation = Validators.required;
  emailValidation = [
    Validators.required,
    Validators.email,
    Validators.maxLength(30),
  ];

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) return null as any;

      const valid = regex.test(control.value);
      return valid ? null : (error as any);
    };
  }

  passwordsValidator(fg: FormGroup) {
    let passWord = fg.get('password');
    let confirmPassWord = fg.get('cPassword');

    if (confirmPassWord?.dirty || confirmPassWord?.touched) {
      if (passWord?.errors !== null)
        confirmPassWord?.setErrors({ firstPasswordInvalid: true });
      else if (passWord?.value !== confirmPassWord?.value)
        confirmPassWord?.setErrors({ passwordsMissMatch: true });
    }
  }

  validationMessages = {
    userName: [
      { type: 'required', message: 'Username is required.' },
      { type: 'maxlength', message: 'Maximum length is 30 characters.' },
    ],

    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Minmum length is 4 characters.' },
      { type: 'maxlength', message: 'Maximum length is 15 characters.' },
      { type: 'hasNumber', message: 'Password must contain number.' },
      {
        type: 'hasUpperCase',
        message: 'Password must contain upper case letter.',
      },
      {
        type: 'hasLowerCase',
        message: 'Password must contain lower case letter.',
      },
      {
        type: 'hasSpicalCharacter',
        message: 'Password must contain spical character.',
      },
    ],

    cPassword: [
      { type: 'required', message: 'Confirm password is required.' },
      {
        type: 'passwordsMissMatch',
        message: "Those passwords didn't match. Try again.",
      },
      {
        type: 'firstPasswordInvalid',
        message: 'The first password is invalid',
      },
    ],
    birthday: [{ type: 'requierd', message: 'birth day is requierd' }],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Enter a valid email.' },
      { type: 'maxlength', message: 'Maximum length is 40 characters.' },
    ],
  };
}
