import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface TarotCard {
    id: string;
    name: string;
    src: string;
}

export interface TarotDeck {
    name : string;
    cards : TarotCard[];
}

@Component({
    selector: 'deck',
    imports: [CommonModule],
    templateUrl: './component.html',
    styleUrls: ['./component.css', './responsives.css']
})
export class Deck {

    //html exports
    Math = Math;

    @Input() deck? : TarotDeck;

}