import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Character } from '../page/character/character';
import { Comic } from '../page/comic/comic';
import { HttpClient  } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import md5 from 'crypto-js/md5';

const MARVEL_URL = 'https://gateway.marvel.com:443/v1/public/';
const PUBLIC_KEY = '584a3ca08536c731ca488d0a17dc4024';
const PRIVATE_KEY = '218fc87316c13a667e8546260c1c91927da767eb';
const PAGE_LIMIT = 20;

@Injectable({
  providedIn: 'root'
})
export class MarvelApiCallService {

  constructor(
    private http: HttpClient
  ) { }
 
  private ts = new Date().getTime();
  private hash = md5( this.ts + PRIVATE_KEY + PUBLIC_KEY );
 
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  /**
   * @author Thiago Velho
   * @description Request responsible for receiving all characters from MARVEL'S API.
   * @param { string} name - String containing characters based on search input value
   * @param { number } offset - Number of desired page to be viewed 
   */
  getCharacters( name: string=undefined, offset?: number ): Observable<Character[]> {
    let marvelAPIQueryString;

    if( !name ) {
      marvelAPIQueryString = `${ MARVEL_URL }characters?limit=${ PAGE_LIMIT }&ts=${ this.ts }&apikey=${ PUBLIC_KEY }&hash=${ this.hash }${ offset ? '&offset=' + offset : ''}`;
    }
    else {
      marvelAPIQueryString = `${ MARVEL_URL }characters?nameStartsWith=${ name }&limit=${ PAGE_LIMIT }&ts=${ this.ts }&apikey=${ PUBLIC_KEY }&hash=${ this.hash }${ offset ? '&offset=' + offset : ''}`;
    }
    
    return this.http.get<any>(marvelAPIQueryString)
      .pipe(
        tap( payload => console.log('fetched characterS data is ', payload), ),
        catchError(this.handleError<Character[]>('getCharacters', [])
      )
    );   
    
  }

  /**
   * @author Thiago Velho
   * @description Request responsible for receiving informations of a character based on a received ID.
   * @param { number } id - id of the character which informations will be searched.
   */
  getCharacter( id: number ): Observable<Character> {
    let marvelAPIQueryString = `${ MARVEL_URL }characters/${ id }?ts=${ this.ts }&apikey=${ PUBLIC_KEY }&hash=${ this.hash }`;

    return this.http.get<any>(marvelAPIQueryString)
      .pipe(
        tap( payload => console.log('fetched character data is ', payload), ),
        map( payload => payload.data.results[0] ),         
        catchError(this.handleError<Character>('getCharacter')
      )
    );
  }

  /**
   * @author Thiago Velho
   * @description Request responsible for receiving all Comics of a specific character.
   * @param { numbr } id - ID of the character
   * @param { number } offset - Number of desired page to be viewed 
   */
  getComicsOfCharacter( id: number, offset?: number ): Observable<Comic[]> {
    let marvelAPIQueryString;
    marvelAPIQueryString = `${ MARVEL_URL }characters/${ id }/comics?limit=${ PAGE_LIMIT }&ts=${ this.ts }&apikey=${ PUBLIC_KEY }&hash=${ this.hash }${ offset ? '&offset=' + offset : ''}`;
   
    return this.http.get<any>(marvelAPIQueryString)
      .pipe(
        tap( payload => console.log('fetched getComicsOfCharacter data is ', payload), ),
        catchError(this.handleError<Comic[]>('getComicsOfCharacter', [])
      )
    );
  }

  /**
   * @author Thiago Velho
   * @description Request responsible for receiving informations of a specific comic based on a received ID.
   * @param { number } id - id of the comic which informations will be searched.
   */
  getComic( id: number ): Observable<Comic> {
    let marvelAPIQueryString = `${ MARVEL_URL }comics/${ id }?ts=${ this.ts }&apikey=${ PUBLIC_KEY }&hash=${ this.hash }`;

    return this.http.get<any>(marvelAPIQueryString)
      .pipe(
        tap( payload => console.log('fetched getComic data is ', payload), ),
        map( payload => payload.data.results[0] ),
        catchError(this.handleError<Comic>('getComic')
      )
    );
  }
}
