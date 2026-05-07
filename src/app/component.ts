import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Counter } from './features/counter/component';
import { ReflectionBoard } from './features/tarot/reflection-board/component';
import { tarotDecks } from './tarot';
import { CardSelector } from './features/tarot/card-selector/component';
import { BottomMenu } from './features/bottom-menu/component';
import { Deck } from './features/tarot/deck/component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        Counter,
        ReflectionBoard,
        CardSelector,
        BottomMenu,
        Deck
    ],
    templateUrl: './component.html',
    styleUrls : ['./component.css']
})
export class App {
    values: number[] = [];

    @ViewChildren(Counter)
    children! : QueryList<Counter>;

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

    click(){
        console.log(this.children);
    }
}