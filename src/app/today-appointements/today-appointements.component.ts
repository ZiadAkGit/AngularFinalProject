import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-today-appointements',
  standalone: false,

  templateUrl: './today-appointements.component.html',
  styleUrl: './today-appointements.component.css',
})
export class TodayAppointementsComponent implements OnInit {
  constructor(private myService: MyServiceService, private router: Router) {}
  appointments: any[] = [];
  todays_appointments: any[] = [];

  ngOnInit(): void {
    const date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    const today = yyyy + '-' + mm + '-' + dd;
    this.myService.getUser().subscribe((data) => {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element['signedin']) {
          for (let i = 0; i < element['appointments'].length; i++) {
            const user = element['appointments'][i];
            if (user['edit']) {
              this.remove(user);
            }
          }
          console.log('edited removed!');
          this.appointments = element['appointments'];
          for (let i = 0; i < element['appointments'].length; i++) {
            const appointment = element['appointments'][i];
            if (appointment['date'] === today) {
              this.todays_appointments.push(appointment);
            }
          }
        }
      }
    });
  }

  edit(appointment: {}) {
    this.myService.getUser().subscribe((data) => {
      for (let index = 0; index < data.length; index++) {
        const user = data[index];
        if (user['signedin']) {
          this.appointments[this.appointments.indexOf(appointment)]['edit'] =
            true;
          user['appointments'] = this.appointments;
          this.myService.updateUser(user['id'], user).subscribe(() => {
            this;
            this.router.navigate(['/new_appointments']);
          });
        }
      }
    });
  }

  remove(appointment: any) {
    this.myService.getUser().subscribe((data) => {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element['signedin']) {
          this.appointments = this.appointments.filter(
            (appointment2) => appointment2 != appointment
          );
          this.myService.getUser().subscribe((data) => {
            for (let index = 0; index < data.length; index++) {
              const element = data[index];
              if (element['signedin']) {
                element['appointments'] = this.appointments;
                this.myService
                  .updateUser(element['id'], element)
                  .subscribe(() => {
                    alert('Removed Succefully');
                    location.reload();
                  });
              }
            }
          });
        }
      }
    });
  }
}
