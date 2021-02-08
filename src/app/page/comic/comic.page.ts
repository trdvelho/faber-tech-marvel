import { Component, OnInit } from '@angular/core';
import { Comic } from './comic';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MarvelApiCallService } from '../../services/marvel-api.service';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.page.html',
  styleUrls: ['./comic.page.scss'],
})
export class ComicPage implements OnInit {

  public comicID: number;
  public comic: Comic;
  public loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private marvelService: MarvelApiCallService
  ) { }

  getComic(): void {
    this.comicID = +this.route.snapshot.paramMap.get('id'); //get ID from URL
    this.loading = true;

    const myObserver = {
      next: (data) => {
        this.comic = data;

        if( this.comic === undefined) {
          console.log("comic UNDEFINED");      
        }
      },
      error: (err) => console.error('Observer getComic got an error: ' + err),
      complete: () => {
        console.log("this.comic when getComicsOfCharacter complete: ", this.comic);
        this.loading = false;    
      },
    };

    this.marvelService.getComic( this.comicID )
      .subscribe( myObserver );
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getComic();
  }
}
