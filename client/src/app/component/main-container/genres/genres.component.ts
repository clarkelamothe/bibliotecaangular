import { Component, OnInit } from '@angular/core';
import { GenderService } from 'src/app/services/gender.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  genres: any = [];
  constructor(private genreService: GenderService) {}

  async ngOnInit() {
    this.genres = await this.genreService.fetchAllGenres();
  }
  async newGenre(genreSent) {
    const genreReceived = await this.genreService.saveGenre(genreSent);
    return genreReceived;
  }
  async genreToDelete(toDelete) {
    const genreDeleted = await this.genreService.deleteGenre(toDelete);

    console.log(genreDeleted);
    return genreDeleted;
  }
  async genreToUpdate(toUpdate) {
    const genreUpdated = await this.genreService.updateGenre(toUpdate);
    console.log(genreUpdated);
    return genreUpdated;
  }
}
