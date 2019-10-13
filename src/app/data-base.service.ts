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

  createCategory(name:string)
  {
    const obj ={name:name};
    return this.http.post<any>(`${this.uri}/cCategory`,obj);
  }

  getCategories()
  {
    return this.http.post<any>(`${this.uri}/getCategories`,{});
  }

  deleteCategory(name:String)
  {
    return this.http.post<any>(`${this.uri}/deleteCategory`,{name:name});
  }

  uploadPath(name:string,path:string,desc:string,cat:string){
    return this.http.post<any>(`${this.uri}/uploadPath`,{name:name,path:path,description:desc,category:cat});
  }

  getPaths(){
    return this.http.post<any>(`${this.uri}/getPaths`,{});
  }
}
