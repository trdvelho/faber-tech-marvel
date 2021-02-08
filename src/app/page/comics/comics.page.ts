import { Component, OnInit } from '@angular/core';
//import { Comic } from '../comic/comic';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MarvelApiCallService } from '../../services/marvel-api.service';
import { MarvelData } from '../characters/marvel-data';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.page.html',
  styleUrls: ['./comics.component.scss'],
})
export class ComicsPage implements OnInit {
  public characterID: number;
  public characterName: string;
  public characterPhoto: string;
  
  //private comics: Comic[] = [];
  public marvelData: MarvelData;
  public loading: boolean = false;
  public loadingCharacter: boolean = false;

  //vars for page buttons
  public totalItemsReturned: number;
  public offsetIndex: number;
  public offsetDistance: number;
  public pageNumber: number;
  public pagesTotal: number;

  constructor( 
    private route: ActivatedRoute,
    private location: Location,
    private marvelService: MarvelApiCallService
  ) { }
  
  getComicsOfCharacter( offset?: number ): void {
    this.characterID = +this.route.snapshot.paramMap.get('id'); //get ID from URL    
    this.loading = true;
    
    const myObserver = {
      next: (res) => {
        this.marvelData = res; //res.data.results
        
        this.totalItemsReturned = res.data.total;
        this.offsetIndex = res.data.offset;
        this.offsetDistance = res.data.limit;
        this.pageNumber = Math.floor(this.offsetIndex / this.offsetDistance) + 1;
        this.pagesTotal = Math.floor(this.totalItemsReturned / this.offsetDistance) + 1;
      },
      error: (err) => console.error('Observer getComicsOfCharacter got an error: ' + err),
      complete: () => {
        this.loading = false;    
      },
    };

    if( !offset ) {
      this.marvelService.getComicsOfCharacter( this.characterID )
        .subscribe( myObserver );
    }
    else {
      this.marvelService.getComicsOfCharacter( this.characterID, offset )
        .subscribe( myObserver );
    }
  }

  nextPage( id: number=undefined ): void {
    const proposedOffsetIndex = this.offsetIndex + this.offsetDistance;

    if( proposedOffsetIndex <= this.totalItemsReturned ) {
      this.getComicsOfCharacter( proposedOffsetIndex );            
    }
  }

  prevPage( id: number=undefined ): void {
    const proposedOffsetIndex = this.offsetIndex - this.offsetDistance;

    if( proposedOffsetIndex >= 0 ){      
      this.getComicsOfCharacter( proposedOffsetIndex );
    }
  }

  getCharacter(): void {
    let id = +this.route.snapshot.paramMap.get('id'); //get ID from URL
    this.loadingCharacter = true;

    // Create observer object
    const myObserver = {
      next: (res) => {
        this.characterName = res.name; //filter out the name only
        this.characterPhoto = res.thumbnail.path + '.' + res.thumbnail.extension;
      },
      error: (err) => console.error('Character Observer got an error: ' + err),
      complete: () => {         
        this.loadingCharacter = false;
      },
    };

    this.marvelService.getCharacter( id )      
      .subscribe( myObserver );
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getCharacter(); 
    this.getComicsOfCharacter();    
  }
}
