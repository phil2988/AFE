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
          this.http.get<T>(url, {observe: 'response'})
          .subscribe({
            complete: () => {
              console.log("Completed api request!")
            },
            error: (e) => {
              observer.error(new HttpResponse<T>({
                status: 400,
                statusText: e,
                body: e
              }))
            },
            next: (resp) => {
              console.log("Returned:", resp)
              observer.next(resp)
            }
          })
        }
        if(type == 'POST'){
          this.http.post<T>(url, body, {observe: 'response'})
            .subscribe({
              complete: () => {
                console.log("Completed api request!")
              },
              error: (e) => {
                return new HttpResponse<T>({
                  status: 400,
                  statusText: e,
                  body: e
                })
              },
              next: (resp) => {
                return resp
              }
          })
        }
        // if{
        //   observer.error(new HttpResponse<T>({
        //     status: 500,
        //     statusText: "Something unexpected happened..."
        //   }))
        // }
        return {
          unsubscribe() {

          },
        }
      }
    )
  }
}
