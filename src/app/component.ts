import { Component, Query, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Counter } from './features/counter/component';
import { Card, ReflectionBoard } from './features/tarot/reflection-board/component';
import { tarotDecks } from './tarot';
import { CardSelector } from './features/tarot/card-selector/component';
import { BottomMenu } from './features/bottom-menu/component';
import { Deck, TarotCard, TarotDeck } from './features/tarot/deck/component';
import { CommonModule } from '@angular/common';
import { PopupScreen } from './features/popup-screen/component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        //Counter,
        ReflectionBoard,
        CardSelector,
        BottomMenu,
        Deck,
        PopupScreen
    ],
    templateUrl: './component.html',
    styleUrls : ['./component.css']
})
export class App {
    values: number[] = [];

    //@ViewChildren(Counter)
    //children! : QueryList<Counter>;
    
    @ViewChild(ReflectionBoard)
    reflectionBoard! : ReflectionBoard;

    tarotDecks = tarotDecks;

    updateValue(index: number, value: number) {
        this.values[index] = value;
        console.log(this.values);
    }

    onCardChange(card: any) {
        console.log('Changed card to:', card);
    }

    click(){
        //console.log(this.children);
    }


    //Card selection

    isCardSelectOpen = false;
    selectedDeck? : TarotDeck;

    openPopup() {
        this.isCardSelectOpen = true;
    }

    closePopup() {
        this.isCardSelectOpen = false;
    }

    clickDeck(deck : TarotDeck){
        this.selectedDeck = deck;
        this.openPopup();
    }

    clickSelectCard(cardIndex : number) {
        this.closePopup();
        const card = this.selectedDeck?.cards?.[cardIndex];
        console.log(card);
        this.reflectionBoard.addCard(card as Card);
    }


}