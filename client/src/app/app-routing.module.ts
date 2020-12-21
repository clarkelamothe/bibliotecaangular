import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksFormComponent } from './component/main-container/books/books-form/books-form.component';
import { BooksListComponent } from './component/main-container/books/books-list/books-list.component';
import { BooksComponent } from './component/main-container/books/books.component';
import { ContactsComponent } from './component/main-container/contacts/contacts.component';
import { GenresComponent } from './component/main-container/genres/genres.component';

const routes: Routes = [
  { path: 'book', component: BooksComponent },
  { path: 'form-book', component: BooksFormComponent },
  { path: 'list-book', component: BooksListComponent },
  { path: 'contact', component: ContactsComponent },
  { path: 'genre', component: GenresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
