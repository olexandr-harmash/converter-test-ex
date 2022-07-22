import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  states: Array<any> = [];

  currencyFirst: string = "EUR";
  currencySecond: string = "USD";

  valuesFirst: string = "0.00";
  valuesSecond: string = "0.00";

  constructor(public currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.get()
     .then(responce => {
       this.states = responce.data;
       this.states.push(
         {r030: 0, txt: 'Українська гривня', rate: 1, cc: 'UAH', exchangedate: this.states[0].exchangedate}
       )
     })
  }

  getCurrencies() {
    this.currencyService.get()
     .then(responce => {
       console.log(responce)
     })
  }

  calculateFirst() {
    (new Calculate(this)).toFirst();
  }
  calculateSecond() {
    (new Calculate(this)).toSecond();
  }
}

//make directive
class Calculate {
  component: ConverterComponent

  constructor(__component: ConverterComponent) {
    this.component = __component;
  }

  toSecond(){
    let rel =
    this.component.states.find((item: any) => item.cc == this.component.currencyFirst).rate /
    this.component.states.find((item: any) => item.cc == this.component.currencySecond).rate;

    let res = (rel > 0) ? parseFloat(this.component.valuesFirst) * rel: parseFloat(this.component.valuesFirst) / rel;

    this.component.valuesSecond = res.toString();
  }

  toFirst(){
    let rel =
    this.component.states.find((item: any) => item.cc == this.component.currencySecond).rate /
    this.component.states.find((item: any) => item.cc == this.component.currencyFirst).rate;

    let res = (rel > 0) ? parseFloat(this.component.valuesSecond) * rel: parseFloat(this.component.valuesSecond) / rel;

    this.component.valuesFirst = res.toString();
  }
}
