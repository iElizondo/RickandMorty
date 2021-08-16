import { CursorError } from "@angular/compiler/src/ml_parser/lexer";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Characters } from "../interdfaces/data.interfaces";

const MY_FAVORITES = 'myFavorites';
@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private characterFavSubject = new BehaviorSubject<Characters[]>(null);
    characterFav$ = this.characterFavSubject.asObservable();
    
    constructor() {
        this.initialStorage();
    }

    addOrRemuveFavorite(character: Characters): void {
        const { id } = character;
        const currentsFav = this.getFavoritesCharacters();
        const found = !!currentsFav.find((fav: Characters) => fav.id === id);
        found ? this.removeFromFavorite(id) : this.addToFavorite(character);
    }

    private addToFavorite(character: Characters): void {
        try {
            const currentsFav = this.getFavoritesCharacters();
            localStorage.setItem(MY_FAVORITES, JSON.stringify([...currentsFav, character]));
            this.characterFavSubject.next([...currentsFav, character])
        } catch (error) {
            console.error('Error saving localStorage', error);
            alert('Error');
        }
    }
    private removeFromFavorite(id: string): void {
        try {
            const currentsFav = this.getFavoritesCharacters();
            const characters = currentsFav.filter(item => item.id !== id);
            localStorage.setItem(MY_FAVORITES, JSON.stringify([...characters]));
            this.characterFavSubject.next([...characters]);
        } catch (error) {
            console.error('Error removing localStorage', error);
            alert('Error');
        }
    }

    getFavoritesCharacters(): any {
        try{
            const charactersFav = JSON.parse(localStorage.getItem(MY_FAVORITES));
            this.characterFavSubject.next(charactersFav);
            return charactersFav;
        } catch (error) {
            console.error('Error getting favorites from localStorage', error);
        }   
    }

    clearStorage():void{
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error cleaning localStorage', error);            
        }
    }

    private initialStorage():void {
        const currents = JSON.parse(localStorage.getItem(MY_FAVORITES));
        if(!currents){
            localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
        }
        this.getFavoritesCharacters();
    }
}