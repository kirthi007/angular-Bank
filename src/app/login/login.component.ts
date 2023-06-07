import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }
  constructor(private router: Router) {}

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
  goToLogin() {
    const storedUserDetails = localStorage.getItem('userDetails');

    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      console.log(userDetails);

      const enteredEmail = this.loginForm.get('email').value;
      const enteredPassword = this.loginForm.get('password').value;
      console.log(enteredEmail);
      console.log(enteredPassword);

      let currentuser = userDetails.find((user: any) => {
        return user.email === enteredEmail && user.password === enteredPassword;
      });
      console.log(currentuser, 'is current user');

      if (currentuser) {
        localStorage.setItem('currentUser', JSON.stringify(currentuser));
        // Construct navigation extras with user details

        // Navigate to home URL with user details
        this.router.navigateByUrl('/home');
      } else {
        // Display message if email or password is incorrect
        alert('Incorrect email or password.');
      }
    } else {
      // Display message if no user details are stored
      alert('No registered user found.');
    }
  }
}
