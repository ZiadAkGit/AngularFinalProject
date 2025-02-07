import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-appointements',
  standalone: false,

  templateUrl: './all-appointements.component.html',
  styleUrl: './all-appointements.component.css',
})
export class AllAppointementsComponent implements OnInit {
  appointments: any[] = [];
  constructor(private myService: MyServiceService, private router: Router) {}
  ngOnInit(): void {
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
                  .subscribe(() => {});
              }
            }
          });
        }
      }
    });
  }
}
