import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private myService: MyServiceService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8), // At least 8 characters
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          ), // At least one lowercase, one uppercase, and one number
        ],
      ],
    });
  }
  ngOnInit(): void {
    this.myService.getUser().subscribe((data) => {
      for (let index = 0; index < data.length; index++) {
        const user = data[index];
        if (user['signedin']) this.router.navigate(['/profile']);
      }
    });
  }

  onSignIn() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.myService.getUser().subscribe((data) => {
        const user = data.find((user: any) => user.email === email);
        if (user) {
          console.log(user);
          if (password === user['password']) {
            user['signedin'] = true;
            this.myService.updateUser(user['id'], user).subscribe(() => {
              alert('Login successful!');
              this.router.navigate(['/profile']);
            });
          } else {
            alert('Incorrect Password!!');
          }
        } else {
          alert('You must register!');
        }
      });
    }
  }

  showPassword() {
    document.getElementById('password')?.setAttribute('type', 'text');
  }
  hidePassword() {
    document.getElementById('password')?.setAttribute('type', 'password');
  }
}
