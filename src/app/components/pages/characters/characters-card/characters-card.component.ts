import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Characters } from '@app/shared/interdfaces/data.interfaces';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersCardComponent {
  @Input() character: Characters;

  getIcon(): string {
    return this.character.isFavorite ? 'heart-solid.svg' : 'heart.svg';
  }
  toggleFavorite(): void {
    const isFavorire = this.character.isFavorite;
    this.getIcon();
    this.character.isFavorite = !isFavorire;
  }
}
