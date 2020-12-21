import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  clicked = false;
  books: any = [];
  constructor(private bookService: BookService) {}

  async ngOnInit() {
    this.books = await this.bookService.fetchAllBooks();
  }

  formLibro() {
    this.clicked = true;
  }
}
