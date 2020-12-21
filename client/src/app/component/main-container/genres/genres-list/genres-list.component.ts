import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavigationStart } from '@angular/router';

@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.scss'],
})
export class GenresListComponent implements OnInit {
  @Input() genres: [];
  @Output() toDelete = new EventEmitter();
  @Output() toUpdate = new EventEmitter();
  editClicked = false;

  constructor() {}

  ngOnInit() {}
  editGenre() {
    this.editClicked = true;
  }
  delete(genre) {
    if (genre.name == '') {
      alert('El genero no existe.');
    }
    this.toDelete.emit(genre);
  }
  updateGenre(genre) {
    if (!genre) {
      alert('No puede estar vacio.');
    }

    this.toUpdate.emit(genre);
  }
}
