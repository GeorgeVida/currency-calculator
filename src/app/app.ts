import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  amount = 1;
  from = 'USD';
  to = 'EUR';
  result: number | null = null;

  rates: any = null;

  constructor(private http: HttpClient) {
    this.loadRates();
  }

loadRates() {
  this.http.get<any>('https://open.er-api.com/v6/latest/USD')
    .subscribe(data => {
      this.rates = data?.rates ?? {};
    });
}

  convert() {
    const rFrom = this.rates[this.from];
    const rTo = this.rates[this.to];

    this.result = (this.amount / rFrom) * rTo;
  }
}