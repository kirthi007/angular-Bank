import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormBuilder,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userDetailsArray: any;
  constructor(private router: Router) {}
  registrationForm!: FormGroup;

  ngOnInit() {
    this.registrationForm = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          this.noWhitespaceValidator,
        ]),
        middleName: new FormControl('', [
          Validators.required,
          this.noWhitespaceValidator,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          this.noWhitespaceValidator,
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._]+@[a-z0-9.-]+.[a-zA-Z]{2,3}'),
        ]),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern('[6789][0-9]{9}'),
        ]),
        address: new FormControl('', [
          Validators.required,
          this.noWhitespaceValidator,
        ]),
        password: new FormControl('', [
          Validators.required,
          this.noWhitespaceValidator,
          Validators.pattern(
            '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\\w\\d\\s:])([^\\s]){8,16}'
          ),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          this.noWhitespaceValidator,
        ]),
      },
      { validators: this.matchPasswords }
    );
  }

  // Custom validator to check for whitespace characters
  noWhitespaceValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    if (control.value && control.value.trim().length === 0) {
      return { whitespace: true };
    }
    return null;
  }

  // Custom validator function for phone number
  // phoneValidator(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const phonePattern = /^[6789]\d{9}$/; // Phone number pattern that starts with 6,7,8,9
  //     const isValid = phonePattern.test(control.value);
  //     return isValid ? null : { 'phone': { value: control.value } };
  //   };
  // }

  //Custom validator for email
  // emailValidator(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const emailPattern = /^[a-zA-Z0-9._]+@[a-z0-9.-]+\.[a-zA-Z]{2,3}$/; // email patter
  //     const isValid = emailPattern.test(control.value);
  //     return isValid ? null : { 'email': { value: control.value } };
  //   };
  // }

  // Custom validator function for matching passwords
  matchPasswords(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordsNotMatched: true };
    }

    return null;
  }

  onSubmit() {
    const createAccNo = () => {
      var date: any;
      var hrs: any;
      var min: any;
      var sec: any;
      var year: any;
      // creating account number
      let timestamp = new Date();
      date = timestamp.getDate();
      hrs = timestamp.getHours();
      min = timestamp.getMinutes();
      sec = timestamp.getSeconds();
      year = timestamp.getFullYear();

      if (date < 10) {
        date = '0' + date;
      }

      if (hrs < 10) {
        hrs = '0' + hrs;
      }

      if (min < 10) {
        min = '0' + min;
      }

      if (sec < 10) {
        sec = '0' + sec;
      }

      // acc number
      const accNo = '' + year + date + hrs + min + sec;

      return accNo;
    };
    const accNo = createAccNo();
    console.log(accNo);
    if (this.registrationForm.valid) {
      const fName = this.registrationForm.get('firstName').value;
      const mName = this.registrationForm.get('middleName').value;
      const lName = this.registrationForm.get('lastName').value;
      const Email = this.registrationForm.get('email').value;
      const Phone = this.registrationForm.get('phone').value;
      const Address = this.registrationForm.get('address').value;
      const Password = this.registrationForm.get('password').value;
      const user = {
        firstName: fName,
        middleName: mName,
        lastName: lName,
        email: Email,
        password: Password,
        account: accNo,
        phone: Phone,
        address: Address,
      };
      const userDetails = this.registrationForm.value;
      console.log(userDetails, 'userDetsails');
      console.log(user, 'object');

      const storedData = localStorage.getItem('userDetails');
      this.userDetailsArray = storedData ? JSON.parse(storedData) : [];
      this.userDetailsArray.push(user);
      localStorage.setItem(
        'userDetails',
        JSON.stringify(this.userDetailsArray)
      );
      this.router.navigateByUrl('/login');
    }
  }
}
