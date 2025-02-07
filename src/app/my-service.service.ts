import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyServiceService {
  private name: string = '';
  private pricing: { description: string; price: number }[] = [];
  private workingHours: string[] = [];
  private url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getName(): string {
    return this.name || 'Guest';
  }

  setName(newName: string): void {
    this.name = newName;
    console.log('Name has been set to:', this.name);
  }

  getPricing(): { description: string; price: number }[] {
    return this.pricing;
  }

  setPricing(newPricing: { description: string; price: number }[]): void {
    this.pricing = newPricing;
    console.log('Pricing has been set:', this.pricing);
  }

  addPricing(description: string, price: number): void {
    this.pricing.push({ description, price });
    console.log('Price has been added:', price, description);
  }

  getWorkingHours(): string[] {
    return this.workingHours;
  }

  setWorkingHours(newWorkingHours: string[]): void {
    this.workingHours = newWorkingHours;
    console.log('Working hours have been set:', this.workingHours);
  }

  addWorkingHour(hour: string): void {
    this.workingHours.push(hour);
    console.log('Working hour added:', hour);
  }
  getUser(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
  setUser(user: any): Observable<any> {
    return this.http.post<any>(this.url, user);
  }
  deleteAppointment(
    userId: string,
    appointment: {
      customerName: string;
      date: string;
      time: string;
      phone: string;
    }
  ): Observable<any> {
    const userUrl = `${this.url}/${userId}`;
    return this.http.delete<any>(userUrl, { body: appointment });
  }

  updateUser(userId: string, updatedUser: any): Observable<any> {
    const userUrl = `${this.url}/${userId}`;
    return this.http.put<any>(userUrl, updatedUser);
  }
}
