import { Component, ElementRef, Query, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Counter } from './features/counter/component';
import { Card, ReflectionBoard } from './features/tarot/reflection-board/component';
import { tarotDecks } from './tarot';
import { CardSelector } from './features/tarot/card-selector/component';
import { BottomMenu } from './features/bottom-menu/component';
import { Deck, TarotCard, TarotDeck } from './features/tarot/deck/component';
import { CommonModule } from '@angular/common';
import { PopupScreen } from './features/popup-screen/component';
import { AudioPlayer } from './AudioPlayer';
import { API_Ask } from './api';

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

    @ViewChild('additionalContext') additionalContext!: ElementRef;

    tarotDecks = tarotDecks;

    //Card selection
    isCardSelectOpen = false;
    selectedDeck? : TarotDeck;
    
    //introduction
    isIntroductionOpen = true;
    
    //context
    isSetContextOpen = false;

    //prediction
    isPredictionOpen = false;

    constructor(){
        this.audioPlayer.load("CardSwipe", 'sounds/oxidvideos-taking-playing-card-2-522516.mp3');
        this.audioPlayer.load("CardSelect", 'sounds/oxidvideos-placing-playing-card-522514.mp3');
        this.audioPlayer.load("CardPut", 'sounds/oxidvideos-placing-playing-card-522514.mp3');
        this.audioPlayer.load("CardRoll", 'sounds/oxidvideos-taking-playing-card-2-522516.mp3');
    }


    updateValue(index: number, value: number) {
        this.values[index] = value;
        console.log(this.values);
    }

    clickDeck(deck : TarotDeck){
        this.selectedDeck = deck;
        this.cardSelector.index = 0;
        this.isCardSelectOpen = true;
    }

    clickSelectCard(cardIndex : number) {
        this.isCardSelectOpen = false;
        const card = this.selectedDeck?.cards?.[cardIndex];
        console.log(card);
        this.reflectionBoard.addCard(card as Card);
        this.audioPlayer.play("CardSelect");
    }

    clickPredict(){
        this.isSetContextOpen = false;
        this.isPredictionOpen = true;

        API_Ask("", (this.additionalContext.nativeElement as HTMLTextAreaElement).value).then(response =>{
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });
    }
}