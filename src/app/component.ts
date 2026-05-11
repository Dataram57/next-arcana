import { Component, Query, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Counter } from './features/counter/component';
import { Card, ReflectionBoard } from './features/tarot/reflection-board/component';
import { tarotDecks } from './tarot';
import { CardSelector } from './features/tarot/card-selector/component';
import { BottomMenu } from './features/bottom-menu/component';
import { Deck, TarotCard, TarotDeck } from './features/tarot/deck/component';
import { CommonModule } from '@angular/common';
import { PopupScreen } from './features/popup-screen/component';
import { AudioPlayer } from './AudioPlayer';

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

    audioPlayer : AudioPlayer = new AudioPlayer;

    //@ViewChildren(Counter)
    //children! : QueryList<Counter>;
    
    @ViewChild(ReflectionBoard)
    reflectionBoard! : ReflectionBoard;

    @ViewChild(CardSelector)
    cardSelector! : CardSelector;

    tarotDecks = tarotDecks;

    constructor(){
        this.audioPlayer.load("CardChange", 'sounds/oxidvideos-taking-playing-card-2-522516.mp3');
        this.audioPlayer.load("CardSelect", 'sounds/oxidvideos-placing-playing-card-522514.mp3');
    }


    updateValue(index: number, value: number) {
        this.values[index] = value;
        console.log(this.values);
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
        this.cardSelector.index = 0;
        this.openPopup();
    }

    clickSelectCard(cardIndex : number) {
        this.closePopup();
        const card = this.selectedDeck?.cards?.[cardIndex];
        console.log(card);
        this.reflectionBoard.addCard(card as Card);
        this.audioPlayer.play("CardSelect");
    }


    //predict future
    predictFuture(){
        console.log(this.reflectionBoard.toString());
    }
}