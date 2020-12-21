import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.scss'],
})
export class BooksFormComponent implements OnInit {
  clicked = false;

  constructor() {}

  ngOnInit(): void {}

  form() {
    this.clicked = true;
  }
}
