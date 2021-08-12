/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Characters, DataResponse, Episode } from '../interdfaces/data.interfaces';

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

  constructor(private apollo: Apollo) { 
    this.getDataAPI();
  }

  private getDataAPI(): void {
    this.apollo.watchQuery<DataResponse>({
      query: QUERY
    }).valueChanges.pipe(
      take(1),
      tap(({ data }) => {
        const { characters, episodes } = data;
        this.charactersSubject.next(characters.results);
        this.episodeSubject.next(episodes.results);
      })
    ).subscribe();
  }
}
