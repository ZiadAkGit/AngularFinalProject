import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-appointements',
  standalone: false,

  templateUrl: './new-appointements.component.html',
  styleUrl: './new-appointements.component.css',
})
export class NewAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  user: any;
  appointments: any[] = [];
  working_Hours: any[] = [];
  days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  haircuts: any[] = [];
  constructor(
    private fb: FormBuilder,
    private myService: MyServiceService,
    private router: Router
  ) {
    this.appointmentForm = this.fb.group({
      customerName: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^((\\+972)?\\d{9}|05\\d{8}|07\\d{8})$'),
        ],
      ],
      haircut: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.myService.getUser().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        const user = data[i];
        if (user['signedin']) {
          this.haircuts = user['pricing'];
          for (let j = 0; j < user['appointments'].length; j++) {
            if (!(user['appointments'][j] == null)) {
              if (user['appointments'][j]['edit']) {
                this.appointmentForm.patchValue({
                  customerName: user['appointments'][j].customerName,
                  date: user['appointments'][j].date,
                  time: user['appointments'][j].time,
                  phoneNumber: user['appointments'][j].phone,
                  haircut: user['appointments'][j].haircut,
                });
                this.myService.updateUser(user['id'], user).subscribe(() => {
                  console.log(user);
                });
              }
            } else {
              continue;
            }
          }
        }
      }
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      this.myService.getUser().subscribe((data) => {
        for (let index = 0; index < data.length; index++) {
          const user = data[index];
          if (user['signedin']) {
            let booked = false;
            let workingh = false;
            const appointment = {
              customerName: this.appointmentForm.value['customerName'],
              date: this.appointmentForm.value['date'],
              time: this.appointmentForm.value['time'],
              phone: this.appointmentForm.value['phoneNumber'],
              haircut: this.appointmentForm.value['haircut'],
              edit: false,
            };
            for (let index = 0; index < user['appointments'].length; index++) {
              const appointment2 = user['appointments'][index];
              if (appointment2 != null)
                if (
                  appointment2['date'] == appointment['date'] &&
                  appointment2['time'] == appointment['time']
                ) {
                  booked = true;
                }
            }
            for (let index = 0; index < user['hours'].length; index++) {
              const hour = user['hours'][index];
              const hourS = hour['startTime'].split(':')[0];
              const hourE = hour['endTime'].split(':')[0];
              const day = this.days[new Date(appointment['date']).getDay()];
              const customerT = appointment['time'].split(':')[0];
              if (
                customerT >= hourS &&
                customerT <= hourE &&
                hour['day'] == day
              )
                workingh = true;
            }
            if (!booked && workingh) {
              user['appointments'].push(appointment);
              this.myService.updateUser(user['id'], user).subscribe(() => {
                alert('Data set!');
                this.router.navigate(['/all_appointments']);
              });
            } else if (booked) {
              alert('Already Booked at this time!');
            } else if (!workingh) {
              alert("You don't work this time!");
            }
          }
        }
      });
    }
  }
}
