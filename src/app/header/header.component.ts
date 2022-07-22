import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  EUR: number = 0;
  USD: number = 0;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.get()
     .then(response => {
       console.log(response)
      this.EUR = response.data.find((item: any) => item.cc === "EUR").rate;
      this.USD = response.data.find((item: any) => item.cc === "USD").rate;
     })
  }

}
