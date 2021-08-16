/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Characters, DataResponse, Episode } from '../interdfaces/data.interfaces';

import { LocalStorageService } from './localStorage.service';
const QUERY = gql `
  {
    episodes {
      results {
        name
        episode
      }
    }
    characters {
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }`;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private episodeSubject = new BehaviorSubject<Episode[]>(null);
  episodes$ = this.episodeSubject.asObservable(); 

  private charactersSubject = new BehaviorSubject<Characters[]>(null);
  characters$ = this.charactersSubject.asObservable(); 

  constructor(private apollo: Apollo, private localStorageSvc: LocalStorageService) { 
    this.getDataAPI();
  }

  private getDataAPI(): void {
    this.apollo.watchQuery<DataResponse>({
      query: QUERY
    }).valueChanges.pipe(
      take(1),
      tap(({ data }) => {
        const { characters, episodes } = data;
        this.episodeSubject.next(episodes.results);
        this.parseCharactersData(characters.results);
      })
    ).subscribe();
  }

  private parseCharactersData(characters):void{
    const currentFavs = this.localStorageSvc.getFavoritesCharacters();
    const newData = characters.map(character => {
      const found = !!currentFavs.find((fav: Characters) => fav.id === character.id);
      return { ... character, isFavorite: found };
    });
    this.charactersSubject.next(newData);
  }
}
