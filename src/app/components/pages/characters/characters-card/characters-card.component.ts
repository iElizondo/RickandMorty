import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Characters } from '@app/shared/interdfaces/data.interfaces';
import { LocalStorageService } from '@app/shared/services/localStorage.service';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersCardComponent {
  @Input() character: Characters;

  constructor(private localStorageSvc: LocalStorageService){}

  getIcon(): string {
    return this.character.isFavorite ? 'heart-solid.svg' : 'heart.svg';
  }
  toggleFavorite(): void {
    const isFavorire = this.character.isFavorite;
    this.getIcon();
    this.character.isFavorite = !isFavorire;
    this.localStorageSvc.addOrRemuveFavorite(this.character);
  }
}
