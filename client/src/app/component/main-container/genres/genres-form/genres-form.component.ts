import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-genres-form',
  templateUrl: './genres-form.component.html',
  styleUrls: ['./genres-form.component.scss'],
})
export class GenresFormComponent implements OnInit {
  clicked = false;
  genre: any = {
    _id: '',
    name: '',
  };

  @Output() genreSent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  formGenre() {
    this.clicked = true;
  }

  saveGenre() {
    if (this.genre.name == '') {
      alert('Falta el genero.');
    }
    this.genreSent.emit(this.genre);
  }
}
