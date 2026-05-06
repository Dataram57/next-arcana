import { Component } from '@angular/core';
import { CounterComponent } from './features/counter/counter.component';
import { TarotCanvasComponent } from './features/tarot/canvas/tarot-canvas.component';
import { tarotDecks } from './tarot';
import { DeckSelector } from './features/tarot/deck-selector/component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CounterComponent,
        TarotCanvasComponent,
        DeckSelector
    ],
    templateUrl: './app.html'
})
export class AppComponent {
    values: number[] = [];

    tarotDecks = tarotDecks;

    updateValue(index: number, value: number) {
        this.values[index] = value;
        console.log(this.values);
    }

    onCardChange(card: any) {
        console.log('Changed card to:', card);
    }

    onCardSelect(card: any) {
        console.log('Selected card:', card);
    }
}