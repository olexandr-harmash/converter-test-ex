import { Injectable } from '@angular/core';

import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor() {}

  get() {
    return axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .then((response) => {
      return response;
    });
  }

}
