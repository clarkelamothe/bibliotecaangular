import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss'],
})
export class ContactsListComponent implements OnInit {
  @Input() contacts: any = [];
  @Output() toDeleteContact = new EventEmitter();
  @Output() toUpdateContact = new EventEmitter();
  editClicked = false;
  constructor() {}

  async ngOnInit() {}
  editNumber() {
    this.editClicked = true;
  }
  delete(contact) {
    this.toDeleteContact.emit(contact);
  }
  updatePhone(contact) {
    this.toUpdateContact.emit(contact);
  }
}
