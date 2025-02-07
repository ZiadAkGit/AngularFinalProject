import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: false,
})
export class SignupComponent {
  registerForm: FormGroup;
  weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  constructor(
    private fb: FormBuilder,
    private myService: MyServiceService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^(\\+972\\d{9}|05\\d{8}|07\\d{8})$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          ),
        ],
      ],
      confirm_password: ['', Validators.required],
      hours: this.fb.array([]),
      pricing: this.fb.array([]),
    });
  }

  get hours(): FormArray {
    return this.registerForm.get('hours') as FormArray;
  }

  get pricing(): FormArray {
    return this.registerForm.get('pricing') as FormArray;
  }

  onSignup(): void {
    let flag;
    if (this.registerForm.valid) {
      const user = {
        name: this.registerForm.value['fullName'],
        email: this.registerForm.value['email'],
        phone: this.registerForm.value['phoneNumber'],
        password: this.registerForm.value['password'],
        pricing: this.registerForm.value['pricing'],
        hours: this.registerForm.value['hours'],
        appointments: [],
        signedin: false,
      };
      this.myService.getUser().subscribe((data) => {
        if (data.length == 0) {
          flag = true;
        } else {
          flag = false;
          for (let index = 0; index < data.length; index++) {
            const user_email = data[index]['email'];
            if (user_email == user['email']) {
              flag = false;
              alert('The user is already registered!!');
              this.router.navigate(['/signin']);
            } else {
              flag = true;
            }
          }
        }
        if (flag) {
          this.myService.setUser(user).subscribe(() => {
            console.log('User has been registered!');
            alert('Signup successfully!');
            this.router.navigate(['/signin']);
          });
          flag = false;
        }
      });
    }
  }

  addPricingRow(): void {
    this.pricing.push(
      this.fb.group({
        price: ['', [Validators.required, Validators.min(1)]],
        description: ['', Validators.required],
      })
    );
  }

  removePricingRow(index: number): void {
    this.pricing.removeAt(index);
  }

  addWorkingHoursRow(): void {
    this.hours.push(
      this.fb.group({
        day: ['', Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
      })
    );
  }

  removeWorkingHoursRow(index: number): void {
    this.hours.removeAt(index);
  }
}
