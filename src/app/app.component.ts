import { Component } from '@angular/core';
import { CounterComponent } from './features/counter/counter.component';
import { TarotCanvasComponent } from './features/tarot/canvas/tarot-canvas.component';
import { tarotDecks } from './tarot';
import { TarotDeckComponent } from './features/tarot/deck/tarot-deck.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CounterComponent,
        TarotCanvasComponent,
        TarotDeckComponent
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

    onCardSelected(card: any) {
        console.log('Selected card:', card);
    }
}