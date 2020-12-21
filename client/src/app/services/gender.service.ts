import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  uri = environment.url;
  constructor(private http: HttpClient) {}

  async fetchAllGenres() {
    try {
      let response = await this.http.get(this.uri + '/genre').toPromise();
      return response;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async saveGenre(newGenre: any) {
    try {
      await this.http.post(this.uri + '/genre', newGenre).toPromise();
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
  async deleteGenre(toDelete: any) {
    try {
      await this.http
        .delete(this.uri + '/genre/delete/' + toDelete._id)
        .toPromise();
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
  async updateGenre(toUpdate: any) {
    try {
      await this.http
        .put(this.uri + '/genre/update/' + toUpdate._id, {
          name: toUpdate.name,
        })
        .toPromise();
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}
