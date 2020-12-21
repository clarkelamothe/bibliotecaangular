import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  uri = environment.url;
  constructor(private http: HttpClient) {}

  async fetchAllPerson() {
    try {
      let response = await this.http.get(this.uri + '/contact').toPromise();
      return response;
    } catch (error) {
      console.log(error.message);
      return;
    }
  }

  async saveContact(newContact: any) {
    try {
      await this.http.post(this.uri + '/contact', newContact).toPromise();
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
  async deleteContact(toDeleteContact: any) {
    try {
      await this.http
        .delete(this.uri + '/contact/delete/' + toDeleteContact._id)
        .toPromise();
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
  async updateContact(toUpdateContact: any) {
    try {
      await this.http
        .put(this.uri + '/contact/update/' + toUpdateContact._id, {
          phone: toUpdateContact.phone,
        })
        .toPromise();
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
  async searchNickname(nickNameSent: any) {
    try {
      await this.http
        .get(this.uri + '/contact/search/' + nickNameSent.nickName)
        .toPromise();
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}
