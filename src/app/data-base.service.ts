import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Observable } from 'rxjs';
import { EmailValidator } from '@angular/forms';
import { UserCategory } from './subscribe-category/UserCategory';
@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  private uri: string = "http://localhost:7762/conDB";

  constructor(private http: HttpClient) { }

  makeUserAdmin(email: string) {
    return this.http.post<any>(`${this.uri}/assignAdmin`, { email: email });
  }
  removeUserFromAdmin(email: string) {
    return this.http.post<any>(`${this.uri}/removeUserFromAdmin`, { email: email });
  }
  addUser(name: string, password: string, email: string): Observable<any> {
    const obj = {
      name: name,
      password: password,
      email: email
    };

    return this.http.post<any>(`${this.uri}/create`, obj);
  }

  getUser(email: string, password: string) {
    const obj = {
      email: email,
      password: password
    };
    return this.http.post<any>(`${this.uri}/getUser`, obj);
  }
  getAllUser() {
    return this.http.post<any>(`${this.uri}/getAllUser`, {});
  }

  updateUser(email: string, password: string, name: string) {
    const __obj = {
      email: email,
      password: password,
      name: name
    };
    return this.http.post<any>(`${this.uri}/updateUser`, __obj);
  }
  createCategory(name: string) {
    const obj = { name: name };
    return this.http.post<any>(`${this.uri}/cCategory`, obj);
  }

  getCategories() {
    return this.http.post<any>(`${this.uri}/getCategories`, {});
  }

  deleteCategory(name: String) {
    return this.http.post<any>(`${this.uri}/deleteCategory`, { name: name });
  }

  uploadPath(name: string, path: string, desc: string, cat: string) {
    return this.http.post<any>(`${this.uri}/uploadPath`, { name: name, path: path, description: desc, category: cat });
  }

  getPaths() {
    return this.http.post<any>(`${this.uri}/getPaths`, {});
  }

  getUserCategories(email: string) {
    return this.http.post<any>(`${this.uri}/getUserCategories`, { email: email });
  }
  checkUserCategory(email: string, category: string) {
    return this.http.post<UserCategory[]>(`${this.uri}/checkUserCategory`, { email: email, category: category });
  }
  subscribeCategoryForUser(email: string, category: string) {
    return this.http.post<any>(`${this.uri}/cUserCategory`, { email: email, category: category });
  }
  deleteCategoryForUser(email: string, category: string) {
    return this.http.post<any>(`${this.uri}/deleteUserCategory`, { email: email, category: category });
  }

  getPathByCategory(category: string) {
    return this.http.post<any>(`${this.uri}/getPathByCategory`, { category: category });
  }
  deletePathByName(name: string) {
    return this.http.post<any>(`${this.uri}/deletePathByName`, { name: name });
  }

  addBooks(name: string, path: string, author: string, description: string, course: string) {
    return this.http.post<any>(`${this.uri}/uploadBook`, { Name: name, Path: path, Author: author, Description: description, Course: course });
  }

  deleteBookByName(name: string) {
    return this.http.post<any>(`${this.uri}/deleteBookByName`, { Name: name });
  }
  getEveryBook() {
    return this.http.post<any>(`${this.uri}/getEveryBooks`, {});
  }

  //notes
  createNote(name: string, email: string) {
    return this.http.post<any>(`${this.uri}/createNote`, { name: name, email: email });
  }
  getNoteByEmail(email: string) {
    return this.http.post<any>(`${this.uri}/getNoteByEmail`, { email: email });
  }
  deleteNote(email: string, name: string) {
    return this.http.post<any>(`${this.uri}/deleteNote`, { email: email, name: name });
  }
  updateNote(email: string, name: string, content: string) {
    return this.http.post<any>(`${this.uri}/updateNote`, { email: email, name: name, content: content });
  }
  sendEmail(course:string,subject:string,content:string)
  {
    return this.http.post<any>(`${this.uri}/SendMail`,{course:course,content:content,subject:subject});
  }
}
