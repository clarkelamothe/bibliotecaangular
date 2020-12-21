import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  uri = environment.url;
  book = {
    name: '',
    description: '',
    gender: '',
    person: '',
  };
  constructor(private http: HttpClient) {}

  async fetchAllBooks() {
    try {
      let response: any;
      response = await this.http.get(this.uri + '/book').toPromise();
      return response;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }
  async getOneBookId(id) {
    try {
      let response: any;
      response = await this.http.get(this.uri + '/book' + '/id').toPromise;
      return [response];
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }
  async saveBook(book) {
    try {
      let response: any;
      response = await this.http.post(this.uri + '/book', book).toPromise;
      return [response];
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }
}
