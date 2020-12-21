import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts: any = [];

  constructor(private personService: PersonService) {}

  async ngOnInit() {
    this.contacts = await this.personService.fetchAllPerson();
  }
  async newContact(contactSent) {
    const contactReceived = await this.personService.saveContact(contactSent);
    return contactReceived;
  }
  async contactToDelete(toDeleteContact) {
    const contactDeleted = await this.personService.deleteContact(
      toDeleteContact
    );

    console.log(contactDeleted);
    return contactDeleted;
  }
  async contactToUpdate(toUpdateContact) {
    const contactUpdated = await this.personService.updateContact(
      toUpdateContact
    );
    return contactUpdated;
  }
  async buscarNickname(nickNameSent) {
    const nicknameReceived = await this.personService.searchNickname(
      nickNameSent
    );
    return nicknameReceived;
  }
}
