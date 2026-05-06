import { Component } from '@angular/core';
import { Counter } from './features/counter/component';
import { ReflectionBoard } from './features/tarot/reflection-board/component';
import { tarotDecks } from './tarot';
import { DeckSelector } from './features/tarot/deck-selector/component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        Counter,
        ReflectionBoard,
        DeckSelector
    ],
    templateUrl: './component.html'
})
export class App {
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