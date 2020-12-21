import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BooksComponent } from './component/main-container/books/books.component';
import { ContactsComponent } from './component/main-container/contacts/contacts.component';
import { GenresComponent } from './component/main-container/genres/genres.component';
import { BooksFormComponent } from './component/main-container/books/books-form/books-form.component';
import { BooksListComponent } from './component/main-container/books/books-list/books-list.component';
import { from } from 'rxjs';
import { ContactsFormComponent } from './component/main-container/contacts/contacts-form/contacts-form.component';
import { ContactsListComponent } from './component/main-container/contacts/contacts-list/contacts-list.component';
import { GenresFormComponent } from './component/main-container/genres/genres-form/genres-form.component';
import { GenresListComponent } from './component/main-container/genres/genres-list/genres-list.component';
import { FormsModule } from '@angular/forms';
import { MainContainerComponent } from './component/main-container/main-container.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    ContactsComponent,
    GenresComponent,
    BooksFormComponent,
    BooksListComponent,
    ContactsFormComponent,
    ContactsListComponent,
    GenresFormComponent,
    GenresListComponent,
    MainContainerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
