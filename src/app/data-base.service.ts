import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Observable } from 'rxjs';
import { EmailValidator } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  private uri:string = "http://localhost:7762/conDB";

  constructor(private http: HttpClient) { }
  
  addUser(name:string,password:string,email:string):Observable<any>
  {
    const obj = {
      name:name,
      password:password,
      email:email
    };

    return this.http.post<any>(`${this.uri}/create`,obj);
  }

  getUser(email:string,password:string)
  {
    const obj = {
      email:email,
      password:password
    };
    return this.http.post<any>(`${this.uri}/getUser`,obj);
  }
}