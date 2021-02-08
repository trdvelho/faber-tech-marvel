import { Component, OnInit } from '@angular/core';
//import { Character } from '../character/character';
import { MarvelData } from './marvel-data';
import { MarvelApiCallService } from '../../services/marvel-api.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {
  public loading: boolean = false;
  public marvelData: MarvelData;

  //vars for page buttons
  public totalItemsReturned: number;
  public offsetIndex: number;
  public itemsToDisplayLimit: number;
  public countOfItemsDisplayed: number;
  public offsetDistance: number;
  public pageNumber: number;
  public pagesTotal: number;
  
  constructor( private marvelService: MarvelApiCallService ) { }

  ngOnInit() {
    this.getCharacters();
  }

  /* include optional params for next and previous */
  getCharacters( name: string=undefined, offset?: number ): void {    
    this.loading = true;

    //object to help debug subscribe
    const myObserver = {
      next: (res) => {
     
        this.marvelData = res;
        this.totalItemsReturned = res.data.total;
        this.offsetIndex = res.data.offset;
        this.countOfItemsDisplayed = res.data.count;
        this.itemsToDisplayLimit = res.data.limit;
        this.offsetDistance = this.itemsToDisplayLimit;
        this.pageNumber = Math.floor(this.offsetIndex / this.offsetDistance) + 1;
        this.pagesTotal = Math.floor(this.totalItemsReturned / this.offsetDistance) + 1;

        if( this.marvelData.data.results === undefined) {
          console.log("characters UNDEFINED");      
        }
      },
      error: (err) => console.error('Observer got an error: ' + err),
      complete: () => {
        console.log("when getCharacters complete this.marvelData: ", this.marvelData);        
        this.loading = false;
      },
    };

    if( !offset ) {
      this.marvelService.getCharacters( name )      
        .subscribe( myObserver );
    }  
    if( offset ) {
      this.marvelService.getCharacters( name, offset )      
        .subscribe( myObserver );
    }
  }

  nextPage( name: string=undefined ): void {
    const proposedOffsetIndex = this.offsetIndex + this.offsetDistance;

    if( proposedOffsetIndex <= this.totalItemsReturned ) {
      this.getCharacters( name, proposedOffsetIndex );            
    }
  }

  prevPage( name: string=undefined ): void {
    const proposedOffsetIndex = this.offsetIndex - this.offsetDistance;

    if( proposedOffsetIndex >= 0 ){      
      this.getCharacters( name, proposedOffsetIndex );
    }
  }

  clearSearch(): void {
    this.getCharacters();
  }

}
