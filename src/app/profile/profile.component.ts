import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,

  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  name: string = '';
  pricing: { description: string; price: number }[] = [];
  workingHours: { day: string; startTime: string; endTime: string }[] = [];
  email: string = '';
  constructor(private myService: MyServiceService, private router: Router) {}

  ngOnInit(): void {
    this.myService.getUser().subscribe((data) => {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element['signedin']) {
          this.name = element['name'];
          this.pricing = element['pricing'] || [];
          this.workingHours = element['hours'] || [];
          this.email = element['email'];
        }
      }
      console.log(data);
    });

    console.log('Profile name:', this.name);
  }
  public logout() {
    this.myService.getUser().subscribe((data) => {
      const user = data.find((user: any) => user.email === this.email);
      if (user) {
        console.log(user);
        user['signedin'] = false;
        this.myService.updateUser(user['id'], user).subscribe(() => {
          this.router.navigate(['/signin']);
        });
      } else {
        alert('Incorrect Password!!');
      }
    });
  }
}
