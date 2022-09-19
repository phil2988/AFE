import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

type RequestType = "GET" | "DELETE" | "POST" | "PUT" | "PATCH";

@Injectable({
  providedIn: 'root'
})

export class AppService {
  apiUrl = "http://localhost:3000/"

  constructor(private http: HttpClient) { }

  sendApiRequest<T = object>(type: RequestType, url: string, body?: object){
    switch (type) {
      case 'GET':
        return new Promise((resolve, reject) => {
          this.http.get("http://localhost:3000/credit_cards", {observe: 'response'})
            .subscribe(response => {
              if(response.status == 200){
                resolve(response)
              }
              else{
                reject(response)
              }
            },
            error => {
              reject(error);
            })
        })
      case 'POST':
        return new Promise((resolve, reject) => {
          this.http.post("http://localhost:3000/credit_cards", body, {observe: 'response'})
            .subscribe(response => {
              if(response.status == 201 || response.status == 200){
                resolve(response)
              }
              else{
                reject(response)
              }
            },
            error => {
              reject(error);
            })
        })
      default:
        throw Error("RequestType is not implemented");
    }
  }
}
