import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type RequestType = "GET" | "DELETE" | "POST" | "PUT" | "PATCH";

@Injectable({
  providedIn: 'root'
})

export class AppService {
  apiUrl = "http://localhost:3000/"

  constructor(private http: HttpClient) { }

  sendApiRequest<T = object>(type: RequestType, url: string, body?: object): Observable<HttpResponse<T>>{
      return new Observable((observer) => {
        if(type == 'GET'){
          this.http.get<T>(this.apiUrl + url, {observe: 'response'})
          .subscribe({
            error: () => {
              observer.error(new HttpResponse<T>({
                status: 400,
                statusText: "Error"
              }))
            },
            next: (resp) => {
              observer.next(resp)
            }
          })
        }
        if(type == 'POST'){
          this.http.post<T>(this.apiUrl + url, body, {observe: 'response'})
            .subscribe({
              error: (e) => {
                observer.error(new HttpResponse<T>({
                  status: 400,
                  statusText: "Error"
                }))
              },
              next: (resp) => {
                observer.next(resp)
              }
          })
        }
        if(type == 'DELETE'){
          this.http.delete<T>(this.apiUrl + url, {observe: 'response'})
            .subscribe({
              error: (e) => {
                observer.error(new HttpResponse<T>({
                  status: 400,
                  statusText: "Error"
                }))
              },
              next: (resp) => {
                observer.next(resp)
              }
            })
        }
      }
    )
  }
}
