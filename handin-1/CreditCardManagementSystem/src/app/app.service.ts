import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

type RequestType = "GET" | "DELETE" | "POST" | "PUT" | "PATCH";

@Injectable({
  providedIn: 'root'
})

export class AppService {
  apiUrl = "http://localhost:3000/"

  constructor(private http: HttpClient) { }

  async sendApiRequest(type: RequestType, url: string, body?: object): Promise<HttpResponse<object>>{
    if(type == 'GET'){
      this.http.get(url, {observe: 'response'})
        .subscribe({
          next: (resp) => {
              return resp
          }
        })
    }

    if(type == 'POST'){
      this.http.post(url, body, {observe: 'response'})
        .subscribe({
          complete: () => {
            console.log("Completed api request!")
          },
          error: (e) => {
            return new HttpResponse<object>({
              status: 400,
              statusText: e
            })
          },
          next: (resp) => {
            return resp
          }
      })
    }


    return new HttpResponse<object>({
      status: 500,
    })
  }
}
