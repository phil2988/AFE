import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from 'src/app/entities/credit-card';

@Injectable({
  providedIn: 'platform'
})
export class HomePageService {
  constructor(private http: HttpClient) { }

  getCreditCardData(): Observable<CreditCard[]>{
    return this.http.get<CreditCard[]>("http://localhost:3000/credit_cards")
  }
}
