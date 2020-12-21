import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.scss'],
})
export class ContactsFormComponent implements OnInit {
  clicked = false;
  contact: any = {
    _id: '',
    name: '',
    lastName: '',
    nickName: '',
    phone: '',
    email: '',
  };

  @Output() contactSent = new EventEmitter();
  @Output() nickNameSent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  form() {
    this.clicked = true;
  }

  saveContact() {
    if (
      this.contact.name == '' ||
      this.contact.lastName == '' ||
      this.contact.nickName == '' ||
      this.contact.email == '' ||
      this.contact.phone == ''
    ) {
      alert('Faltan datos en el formulario.');
    }
    this.contactSent.emit(this.contact);
  }
  buscarAlias() {
    if (this.contact.nickName == '') {
      alert('Ingrese un alias');
    }
    this.nickNameSent.emit(this.contact.name);
  }
}
